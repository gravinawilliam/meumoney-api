import IUserRole from '@modules/users/interfaces/models/IUserRole';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('user_roles')
export default class UserRole implements IUserRole {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
