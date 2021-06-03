import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RefactorValuesMoney1622672074130
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bank_accounts', 'balance');
    await queryRunner.dropColumn('transactions', 'value');
    await queryRunner.addColumn(
      'bank_accounts',
      new TableColumn({
        name: 'balance',
        type: 'decimal',
        precision: 10,
        scale: 2,
      }),
    );
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'decimal',
        precision: 10,
        scale: 2,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'value');
    await queryRunner.dropColumn('bank_accounts', 'balance');
    await queryRunner.addColumn(
      'bank_accounts',
      new TableColumn({
        name: 'balance',
        type: 'double precision',
      }),
    );
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'double precision',
      }),
    );
  }
}
