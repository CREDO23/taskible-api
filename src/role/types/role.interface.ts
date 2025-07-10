import { BaseEntityInterface } from 'src/contracts/common';
import { RoleEnum } from './role.enums';

export interface RoleInterface extends BaseEntityInterface {
  name: RoleEnum;
  description?: string;
}
