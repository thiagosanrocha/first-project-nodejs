import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterTypeIdColumnToUuid1598726546565
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "appointments",
      "id",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "appointments",
      "id",
      new TableColumn({
        name: "id",
        type: "varchar",
        isPrimary: true,
      }),
    );
  }
}
