import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { ApiKeyEntity } from './api-key/entities/api-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ApiKeyEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
