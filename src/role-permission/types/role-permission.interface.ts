import { BaseInterface } from 'src/contracts/common';

export interface RolePermissionInterface extends BaseInterface {
  name: string;
  description?: string;
  roleId: string;
}
