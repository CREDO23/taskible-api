import { SetMetadata } from '@nestjs/common';
import { AuthenticationTypeEnum } from '../enums/auth-types.enums';
import { AUTHENTICATION_TYPE } from '../constant';

export const AuthenticationType = (
  ...authenticationTypes: AuthenticationTypeEnum[]
) => SetMetadata(AUTHENTICATION_TYPE, authenticationTypes);
