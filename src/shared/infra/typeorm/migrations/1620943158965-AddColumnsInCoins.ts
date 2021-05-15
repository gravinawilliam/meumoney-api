import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsInCoins1620943158965
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.dropColumn('coins', 'name');
    await queryRunner.dropColumn('coins', 'symbol');
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'symbol',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('coins', 'symbol');
    await queryRunner.dropColumn('coins', 'name');
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'symbol',
        type: 'varchar',
        isUnique: true,
      }),
    );
    await queryRunner.addColumn(
      'coins',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: true,
      }),
    );
    await queryRunner.dropColumn('coins', 'sell');
    await queryRunner.dropColumn('coins', 'buy');
  }
}
