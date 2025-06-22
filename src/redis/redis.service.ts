import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { redisConfig } from './config/redis.config';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @Inject(redisConfig.KEY)
    private readonly redisConfiguration: ConfigType<typeof redisConfig>,
  ) {}

  public redisClient: Redis;
  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.redisConfiguration.host,
      port: this.redisConfiguration.port,
    });
  }

  onApplicationShutdown() {
    return this.redisClient.quit();
  }
}
