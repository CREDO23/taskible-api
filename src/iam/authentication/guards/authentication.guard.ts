import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticationTypeEnum } from '../enums/auth-types.enums';
import { AccessTokenGuard } from './access-token.guard';
import { ApiKeyGuard } from '../../../api-key/guards/api-key.guard';
import { AUTHENTICATION_TYPE } from '../constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthenticationTypeEnum.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthenticationTypeEnum,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthenticationTypeEnum.Bearer]: this.accessTokenGuard,
      [AuthenticationTypeEnum.None]: { canActivate: () => true },
      [AuthenticationTypeEnum.ApiKey]: this.apiKeyGuard,
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<
      AuthenticationTypeEnum[]
    >(AUTHENTICATION_TYPE, [context.getHandler(), context.getClass()]) ?? [
      AuthenticationGuard.defaultAuthType,
    ];

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
