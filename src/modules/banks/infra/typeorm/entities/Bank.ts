import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import IBank from '@modules/banks/interfaces/models/IBank';
import uploadConfig from '@config/upload.config';

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
  @Exclude()
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

  @Expose({ name: 'logo_url' })
  getLogoUrl(): string | null {
    if (!this.logo) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
