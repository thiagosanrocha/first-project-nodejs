import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterProviderToProviderId1598727181197
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "appointments",
      "provider",
      new TableColumn({
        name: "provider_id",
        type: "uuid",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "appointments",
      "provider_id",
      new TableColumn({
        name: "provider",
        type: "varchar",
        isNullable: false,
      }),
    );
  }
}
