import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { v4 } from 'uuid';
import IUser from '@modules/users/interfaces/models/IUser';
import EncryptionDataBase from '@shared/utils/EncryptionDataBase';
import BankAccount from '@modules/bankAccounts/infra/typeorm/entities/BankAccount';

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

  @OneToMany(() => BankAccount, bankAccount => bankAccount.user)
  bankAccounts: BankAccount[];

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
