import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import IBankAccount from '@modules/bankAccounts/interfaces/models/IBankAccount';

@Entity('bank_accounts')
export default class BankAccount implements IBankAccount {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  accountNumbers: string;

  @Column({
    type: 'varchar',
  })
  cardholderName: string;

  @Column({
    type: 'double precision',
  })
  balance: number;

  @Column({
    type: 'integer',
  })
  monthValidity: number;

  @Column({
    type: 'integer',
  })
  yearValidity: number;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @Column({
    type: 'uuid',
  })
  bankId: string;

  @Column({
    type: 'varchar',
  })
  symbolCoin: string;

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
