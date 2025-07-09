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
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { RedisModule } from 'src/redis/redis.module';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RolesGuard } from './authorization/guards/roles.guard';
import { ApiKeyService } from './authentication/api-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyEntity } from './api-key/entities/api-key.entity';
import { ApiKeyGuard } from './authentication/guards/api-key.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ApiKeyEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RedisModule,
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
    ApiKeyService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
