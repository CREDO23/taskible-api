import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationTypeEnum } from '../../iam/authentication/enums/auth-types.enums';
import { Request } from 'express';
import { ApiKeyService } from '../api-keys.service';
import { REQUEST_USER_KEY } from 'src/iam/constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKeyFromRequest(request);

    if (!apiKey) {
      return false;
    }

    try {
      const apiKeyEntityId = this.apiKeyService.extractIdFromApiKey(apiKey);

      const apiKeyEntity =
        await this.apiKeyService.getApiKeyByUuid(apiKeyEntityId);

      const { user, hashedKey } = apiKeyEntity;

      // Is API key valid?
      await this.apiKeyService.validateApiKey(apiKey, hashedKey);

      request[REQUEST_USER_KEY] = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  extractApiKeyFromRequest(request: Request): string | undefined {
    const [authType, apiKey] = request.headers.authorization?.split(' ') ?? [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    return authType === AuthenticationTypeEnum.ApiKey ? apiKey : undefined;
  }
}
