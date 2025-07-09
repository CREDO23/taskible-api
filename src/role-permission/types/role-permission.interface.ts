import { BaseEntityInterface } from 'src/contracts/common';

export interface RolePermissionInterface extends BaseEntityInterface {
  name: string;
  description?: string;
  roleId: string;
}
