import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { SigninDto } from './DTOs/signin.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { UserEntity } from 'src/user/user.entity';
import { ActiveUserInterface } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './DTOs/refresh-token.dto';

@Injectable()
export class SigninService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signin(data: SigninDto) {
    const doesUserExist = await this.userService.findOneUserByFields({
      email: data.email,
    });

    if (!doesUserExist) {
      throw new BadRequestException('Invalid credentials');
    }

    const doesPasswordMatch = await this.hashingService.comparePasswords(
      data.password,
      doesUserExist.password,
    );

    if (!doesPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.generateTokens(doesUserExist);
  }

  async refreshTokens(data: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<ActiveUserInterface>(
        data.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      const user = await this.userService.findOneUserByFields({
        id: parseInt(String(sub), 10),
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return await this.generateTokens(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.singToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
      }),
      this.singToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async singToken(
    userId: string | number,
    expiresIn: number,
    payload?: Record<string, unknown>,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...(payload && payload),
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
