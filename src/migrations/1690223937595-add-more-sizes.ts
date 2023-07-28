import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreSizes1690223937595 implements MigrationInterface {
    name = 'AddMoreSizes1690223937595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('UNICO', 'XS', 'S', 'M', 'L', 'XL', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44') NOT NULL DEFAULT 'M'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('UNICO', 'XS', 'S', 'M', 'L', 'XL', '26', '28', '30', '32', '36', '38', '40', '42', '44') NOT NULL DEFAULT 'M'`);
    }

}
