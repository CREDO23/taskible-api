import { RoleEnum } from 'src/role/types/role.enums';

export type AccessTokenPayloadType = {
  sub: string;
  userId: string;
  email: string;
  role: RoleEnum;
};
