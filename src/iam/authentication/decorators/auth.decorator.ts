import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-types.enums';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata('authTypes', authTypes);
// TODO: Find a descriptive name for this decorator
