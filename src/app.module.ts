import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { TaskStatusModule } from './task-status/task-status.module';
import { TaskPriorityModule } from './task-priority/task-priority.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { IamModule } from './iam/iam.module';
import { RedisModule } from './redis/redis.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    RedisModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    RolePermissionModule,
    TaskStatusModule,
    TaskPriorityModule,
    CommonModule,
    IamModule,
  ],
})
export class AppModule {}
