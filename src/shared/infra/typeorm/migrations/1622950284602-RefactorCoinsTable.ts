import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RefactorCoinsTable1622950284602
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('coins', 'buy');
    await queryRunner.dropColumn('coins', 'sell');
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'buy',
        type: 'double precision',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'sell',
        type: 'double precision',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('coins', 'sell');
    await queryRunner.dropColumn('coins', 'buy');
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'sell',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'buy',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    );
  }
}
