import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBanks1620829157129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'banks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'logo',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'redColorCard',
            type: 'integer',
          },
          {
            name: 'greenColorCard',
            type: 'integer',
          },
          {
            name: 'blueColorCard',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('banks');
  }
}
