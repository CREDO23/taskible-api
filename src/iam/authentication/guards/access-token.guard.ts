import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/iam/constants';
import { AccessTokenPayloadType } from '../types/acess-token.payload.type';
import { AuthTypeEnum } from '../enums/auth-types.enums';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayloadType>(
        token,
        {
          secret: this.jwtConfiguration.secret,
        },
      );
      request[REQUEST_USER_KEY] = payload;
      // TODO : Extends the request object in the express namespace with 'user' property
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [authType, token] = request.headers.authorization?.split(' ') ?? [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    return authType === AuthTypeEnum.Bearer ? token : undefined;
  }
}
