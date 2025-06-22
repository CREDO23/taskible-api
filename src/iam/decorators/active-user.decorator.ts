import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants';
import { Request } from 'express';
import { ActiveUserType } from '../types/active-user.type';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request[REQUEST_USER_KEY] as ActiveUserType;
    return field ? user?.[field] : user;
  },
);
