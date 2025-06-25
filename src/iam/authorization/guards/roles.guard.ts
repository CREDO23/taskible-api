import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'src/role/types/role.enums';
import { ROLES_KEY } from '../constants';
import { REQUEST_USER_KEY } from 'src/iam/constants';
import { Request } from 'express';
import { AccessTokenUserData } from 'src/iam/types/active-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const contextRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!contextRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const user = request[REQUEST_USER_KEY] as AccessTokenUserData;

    return contextRoles.some((role) => user.role == role);
  }
}
