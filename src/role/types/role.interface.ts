import { BaseInterface } from 'src/contracts/common';
import { RoleEnum } from './role.enums';

export interface RoleInterface extends BaseInterface {
  name: RoleEnum;
  description?: string;
}
