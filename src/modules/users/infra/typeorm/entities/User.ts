import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import IUser from '@modules/users/interfaces/models/IUser';
import EncryptionDataBase from '@shared/utils/EncryptionDataBase';

@Entity('users')
export default class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    transformer: EncryptionDataBase,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

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
