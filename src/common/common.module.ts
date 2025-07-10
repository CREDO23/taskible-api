import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogginMiddleware } from './middleware/logging.middleware';

@Module({})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogginMiddleware).forRoutes('*');
  }
}
