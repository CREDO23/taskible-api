import { BaseEntityInterface } from 'src/contracts/common';

export interface ApiKeyInterface
  extends Omit<BaseEntityInterface, 'updatedAt'> {
  key: string;
  uuid: string;
}
