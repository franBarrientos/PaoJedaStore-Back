import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToCustomerTable1690130895376 implements MigrationInterface {
    name = 'AddPhoneToCustomerTable1690130895376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP FOREIGN KEY \`FK_7f2e96323fbbeff797e59082f86\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase\` CHANGE \`state\` \`state\` varchar(255) NOT NULL DEFAULT 'pendiente'`);
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('UNICO', 'XS', 'S', 'M', 'L', 'XL') NOT NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD CONSTRAINT \`FK_7f2e96323fbbeff797e59082f86\` FOREIGN KEY (\`purchaseId\`) REFERENCES \`purchase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchases_products\` DROP FOREIGN KEY \`FK_7f2e96323fbbeff797e59082f86\``);
        await queryRunner.query(`ALTER TABLE \`size\` CHANGE \`name\` \`name\` enum ('XS', 'S', 'M', 'L', 'XL') NOT NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`purchase\` CHANGE \`state\` \`state\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` ADD CONSTRAINT \`FK_7f2e96323fbbeff797e59082f86\` FOREIGN KEY (\`purchaseId\`) REFERENCES \`purchase\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

}
