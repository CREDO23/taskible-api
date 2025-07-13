import { Module } from '@nestjs/common';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyEntity } from './api-key.entity';
import { BcryptService } from 'src/common/services/hashing/bcrypt.service';
import { HashingService } from 'src/common/services/hashing/hashing.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
  controllers: [ApiKeyController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ApiKeyService,
  ],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
