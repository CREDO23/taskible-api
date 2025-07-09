import { BaseEntityInterface } from '../common';
import { UserInterface } from '../user/user.interface';

export interface TaskInterface extends BaseEntityInterface {
  title: string;
  taskNumber: number;
  description?: string;
  status: string;
  assignees?: UserInterface[];
}
