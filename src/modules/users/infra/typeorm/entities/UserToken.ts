import IUserToken from '@modules/users/interfaces/models/IUserToken';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('user_tokens')
export default class UserToken implements IUserToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
