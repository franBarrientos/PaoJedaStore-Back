import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStateColumngToCategoryTable1690578858242 implements MigrationInterface {
    name = 'AddStateColumngToCategoryTable1690578858242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`state\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('UNICO', 'XS', 'S', 'M', 'L', 'XL', '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46') NOT NULL DEFAULT 'M'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('UNICO', 'XS', 'S', 'M', 'L', 'XL', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44') NOT NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`state\``);
    }

}
