import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyUserBank1621282286592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'bank_accounts',
      new TableForeignKey({
        name: 'UserIdInBankAccounts',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'bank_accounts',
      new TableForeignKey({
        name: 'BankIdInBankAccounts',
        columnNames: ['bank_id'],
        referencedTableName: 'banks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bank_accounts', 'UserIdInBankAccounts');
    await queryRunner.dropForeignKey('bank_accounts', 'BankIdInBankAccounts');
  }
}
