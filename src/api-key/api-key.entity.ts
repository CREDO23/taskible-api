import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKeyInterface } from './types/api-key.interface';
import { UserEntity } from 'src/user/user.entity';

@Entity('api_key')
export class ApiKeyEntity implements ApiKeyInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedKey: string;

  @Column()
  uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.apiKeys, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
