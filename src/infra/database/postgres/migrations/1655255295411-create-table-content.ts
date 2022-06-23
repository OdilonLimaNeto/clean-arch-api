import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class createTableContent1655255295411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contents',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'thumbnail',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'published',
                        type: 'boolean',
                        isNullable: false,
                    },
                    {
                        name: 'sourceDuration',
                        type: 'real',
                        isNullable: false,
                    },
                    {
                        name: 'sourceSize',
                        type: 'bigint',
                        isNullable: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )

        await queryRunner.createUniqueConstraint('contents', new TableUnique({
            columnNames: [ 'title' ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contents')
    }

}
