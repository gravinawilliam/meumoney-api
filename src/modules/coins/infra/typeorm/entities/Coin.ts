import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import ICoin from '@modules/coins/interfaces/models/ICoin';

@Entity('coins')
export default class Coin implements ICoin {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  symbol: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    unique: true,
  })
  buy: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    unique: true,
  })
  sell: number;

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
