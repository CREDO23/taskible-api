export interface BaseEntityInterface {
  readonly id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEntityOmittedFields = 'id' | 'createdAt' | 'updatedAt';
