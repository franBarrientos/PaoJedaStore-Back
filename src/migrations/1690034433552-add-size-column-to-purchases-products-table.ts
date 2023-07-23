import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSizeColumnToPurchasesProductsTable1690034433552 implements MigrationInterface {
    name = 'AddSizeColumnToPurchasesProductsTable1690034433552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD \`sizeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD CONSTRAINT \`FK_4f2d1fca76322dda816b3cf2767\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP FOREIGN KEY \`FK_4f2d1fca76322dda816b3cf2767\``);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP COLUMN \`sizeId\``);
    }

}
