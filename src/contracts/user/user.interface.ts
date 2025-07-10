import { BaseEntityInterface } from '../common';
import { TaskInterface } from '../task/task.interface';

export interface UserInterface extends BaseEntityInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  tasks?: TaskInterface[];
}
