import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RefactorNamesColumnsTableBanks1620838725953
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('banks', 'redColorCard');
    await queryRunner.dropColumn('banks', 'blueColorCard');
    await queryRunner.dropColumn('banks', 'greenColorCard');
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'red_color_card',
        type: 'integer',
      }),
    );
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'blue_color_card',
        type: 'integer',
      }),
    );
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'green_color_card',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('banks', 'red_color_card');
    await queryRunner.dropColumn('banks', 'blue_color_card');
    await queryRunner.dropColumn('banks', 'green_color_card');
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'redColorCard',
        type: 'integer',
      }),
    );
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'blueColorCard',
        type: 'integer',
      }),
    );
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'greenColorCard',
        type: 'integer',
      }),
    );
  }
}
