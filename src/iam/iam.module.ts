import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { SigninService } from './authentication/signin.service';
import { SignupService } from './authentication/signup.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids-storage.service';
import { RedisModule } from 'src/redis/redis.module';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RolesGuard } from './authorization/guards/roles.guard';
import { ApiKeyGuard } from '../api-key/guards/api-key.guard';
import { ApiKeyModule } from 'src/api-key/api-key.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RedisModule,
    ApiKeyModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SigninService,
    SignupService,
    AccessTokenGuard,
    ApiKeyGuard,
    RefreshTokenIdsStorage,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
