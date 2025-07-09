import { Injectable } from '@nestjs/common';
import { GeneratedApiKeyPayload } from 'src/iam/api-key/types/generated-api-key-payload.type';
import { HashingService } from '../hashing/hashing.service';
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from 'src/iam/api-key/entities/api-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly hashingService: HashingService,
    @InjectRepository(ApiKeyEntity)
    private readonly apiKeyRepository: Repository<ApiKeyEntity>,
  ) {}
  async createApiKey(
    // TODO: Use Uuid instead of string
    uuid: string,
    userId: number,
  ): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(uuid);
    const hashedKey = await this.hashApiKey(apiKey);

    const newApiKey = this.apiKeyRepository.create({
      uuid,
      hashedKey,
      user: {
        id: userId,
      },
    });

    await this.apiKeyRepository.save(newApiKey);

    return {
      apiKey,
      hashedKey,
    };
  }

  private generateApiKey(id: string): string {
    const apiKey = `${id}:${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }

  private hashApiKey(apiKey: string) {
    return this.hashingService.hash(apiKey);
  }

  async validateApiKey(apiKey: string, hashedKey: string): Promise<boolean> {
    // Might be better to choose a performant hashing algorithm here, since we will need to validate the apiKey for every request
    return this.hashingService.compare(apiKey, hashedKey);
  }

  extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(':');
    return id;
  }

  async getApiKeyByUuid(uuid: string): Promise<ApiKeyEntity> {
    return this.apiKeyRepository.findOneOrFail({
      where: {
        uuid,
      },

      relations: {
        user: true,
      },
    });
  }
}
