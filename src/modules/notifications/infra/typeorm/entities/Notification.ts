import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import INotification from '@modules/notifications/interfaces/models/INotification';

@Entity('notifications')
export default class Notification implements INotification {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'uuid',
  })
  transactionId: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  viewed: boolean;

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
    if (!this.viewed) {
      this.viewed = false;
    }
  }
}
