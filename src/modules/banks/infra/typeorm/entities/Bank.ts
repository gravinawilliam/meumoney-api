import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import IBank from '@modules/banks/interfaces/models/IBank';

@Entity('banks')
export default class Bank implements IBank {
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
    nullable: true,
  })
  logo: string;

  @Column({
    type: 'integer',
  })
  redColorCard: number;

  @Column({
    type: 'integer',
  })
  greenColorCard: number;

  @Column({
    type: 'integer',
  })
  blueColorCard: number;

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
