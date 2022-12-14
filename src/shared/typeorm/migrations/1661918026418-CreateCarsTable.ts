import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCarsTable1661918026415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'car',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isUnique: true,
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'plate',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'chassis',
                  type: 'varchar',
                },
                {
                  name: 'renavam',
                  type: 'varchar',
                },
                {
                  name: 'model',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'brand',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'year',
                  type: 'integer',
                  isNullable: false,
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('car');
    }

}
