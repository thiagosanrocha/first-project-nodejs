import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CreateTableAvatars1598755059734
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "avatars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "path",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "filename",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "avatars",
      new TableForeignKey({
        name: "RelationshipBetweenUserIdAndAvatars",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "avatars",
      "RelationshipBetweenUserIdAndAvatars",
    );

    await queryRunner.dropTable("avatars");
  }
}
