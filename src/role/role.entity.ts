import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleInterface } from './types/role.interface';
import { RoleEnum } from './types/role.enums';

@Entity('role')
export class RoleEntity implements RoleInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleEnum;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
