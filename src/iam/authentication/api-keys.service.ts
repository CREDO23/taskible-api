import { Injectable } from '@nestjs/common';
import { GeneratedApiKeyPayload } from 'src/user/api-key/types/generated-api-key-payload.type';
import { HashingService } from '../hashing/hashing.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ApiKeysService {
  constructor(private readonly hashingService: HashingService) {}
  async createApiKey(userId: string): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(userId);
    const hashedKey = await this.hashApiKey(apiKey);

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

  extractUserIdFromApiKey(apiKey: string): string {
    const [userId] = Buffer.from(apiKey, 'base64').toString('ascii').split(':');
    return userId;
  }
}
