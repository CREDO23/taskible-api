import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKeyInterface } from '../types/api-key.interface';
import { UserEntity } from 'src/user/user.entity';

@Entity('api_key')
export class ApiKeyEntity implements ApiKeyInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.apiKeys)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
