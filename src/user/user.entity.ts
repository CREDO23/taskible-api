import { RoleEnum } from 'src/role/types/role.enums';
import { UserInterface } from 'src/contracts/user/user.interface';
import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiKeyEntity } from '../iam/api-key/entities/api-key.entity';

@Entity('user')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ADMIN,
  })
  role: string;

  @JoinTable({ name: 'user_tasks' })
  @ManyToMany(() => TaskEntity, (task) => task.assignees)
  tasks: TaskEntity[];

  @JoinTable({ name: 'user_api_keys' })
  @OneToMany(() => ApiKeyEntity, (apiKey) => apiKey.user)
  apiKeys: ApiKeyEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
