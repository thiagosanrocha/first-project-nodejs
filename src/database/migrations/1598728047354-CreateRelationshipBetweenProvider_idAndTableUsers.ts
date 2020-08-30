import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export default class CreateRelationshipBetweenProviderIdAndTableUsers1598728047354
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "RelationshipBetweenProvider_IdAndUserID",
        columnNames: ["provider_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "appointments",
      "RelationshipBetweenProvider_IdAndUserID",
    );
  }
}
