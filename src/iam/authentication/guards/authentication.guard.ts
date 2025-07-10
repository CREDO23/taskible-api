import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTypeEnum } from '../enums/auth-types.enums';
import { AccessTokenGuard } from './access-token.guard';
import { ApiKeyGuard } from '../../../api-key/guards/api-key.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypeEnum.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthTypeEnum,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthTypeEnum.Bearer]: this.accessTokenGuard,
      [AuthTypeEnum.None]: { canActivate: () => true },
      [AuthTypeEnum.ApiKey]: this.apiKeyGuard,
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthTypeEnum[]>(
      'authTypes',
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    let error = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err: HttpException) => {
        error = err;
      });
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
