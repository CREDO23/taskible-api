import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private readonly redisService: RedisService) {}

  async insert(userId: number, tokenId: string) {
    await this.redisService.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string) {
    const storedId = await this.redisService.redisClient.get(
      this.getKey(userId),
    );

    console.log(storedId, tokenId);
    return storedId === tokenId;
  }

  async invalidate(userId: number) {
    await this.redisService.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number) {
    return `user-${userId}`;
  }
}
