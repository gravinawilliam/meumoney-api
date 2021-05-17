import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBankAccounts1621113755997
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank_accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'account_numbers',
            type: 'varchar',
          },
          {
            name: 'cardholder_name',
            type: 'varchar',
          },
          {
            name: 'balance',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'month_validity',
            type: 'integer',
          },
          {
            name: 'year_validity',
            type: 'integer',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'bank_id',
            type: 'uuid',
          },
          {
            name: 'symbol_coin',
            type: 'enum',
            enum: [
              'GBP',
              'ARS',
              'CAD',
              'AUD',
              'JPY',
              'CNY',
              'BTC',
              'EUR',
              'USD',
            ],
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bank_accounts');
  }
}
