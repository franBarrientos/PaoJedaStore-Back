import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockColumnToProdutssizesTable1689986908666 implements MigrationInterface {
    name = 'AddStockColumnToProdutssizesTable1689986908666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size\` ADD \`stock\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_3f62b42ed23958b120c235f74df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_2195a69f2b102198a497036ec9e\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD CONSTRAINT \`FK_7f2e96323fbbeff797e59082f86\` FOREIGN KEY (\`purchaseId\`) REFERENCES \`purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD CONSTRAINT \`FK_45bea01fee427dee7d08eab04a4\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_sizes\` ADD CONSTRAINT \`FK_1aa1059c43b0edc3762ec93da4c\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_sizes\` ADD CONSTRAINT \`FK_83363c1d7b2a3f93ab631b1c516\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`products_sizes\` DROP FOREIGN KEY \`FK_83363c1d7b2a3f93ab631b1c516\``);
        await queryRunner.query(`ALTER TABLE \`products_sizes\` DROP FOREIGN KEY \`FK_1aa1059c43b0edc3762ec93da4c\``);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP FOREIGN KEY \`FK_45bea01fee427dee7d08eab04a4\``);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP FOREIGN KEY \`FK_7f2e96323fbbeff797e59082f86\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_2195a69f2b102198a497036ec9e\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_3f62b42ed23958b120c235f74df\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP COLUMN \`stock\``);
    }

}
