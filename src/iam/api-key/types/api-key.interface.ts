import { BaseEntityInterface } from 'src/contracts/common';
import { UserInterface } from 'src/contracts/user/user.interface';

export interface ApiKeyInterface
  extends Omit<BaseEntityInterface, 'updatedAt'> {
  hashedKey: string;
  uuid: string;
  user: UserInterface;
}
