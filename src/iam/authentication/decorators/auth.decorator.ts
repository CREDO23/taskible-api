import { SetMetadata } from '@nestjs/common';
import { AuthTypeEnum } from '../enums/auth-types.enums';

export const Auth = (...authTypes: AuthTypeEnum[]) =>
  SetMetadata('authTypes', authTypes);
// TODO: Find a descriptive name for this decorator
