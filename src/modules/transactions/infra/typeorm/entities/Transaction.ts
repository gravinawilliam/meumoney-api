import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import ITransaction from '@modules/transactions/interfaces/models/ITransaction';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

@Entity('transactions')
export default class Transaction implements ITransaction {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  value: number;

  @Column({
    type: 'varchar',
  })
  transactionType: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  note: string;

  @Column({
    type: 'varchar',
  })
  date: Date;

  @Column({
    type: 'varchar',
  })
  symbolCoin: string;

  @Column({
    type: 'varchar',
  })
  userId: string;

  @Column({
    type: 'uuid',
  })
  fromBankAccountId: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  toBankAccountId?: string | null;

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
