import { MigrationInterface, QueryRunner } from "typeorm";

export class fixBugs1678134706571 implements MigrationInterface {
    name = 'fixBugs1678134706571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "number" character varying(6)`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "zipCode" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "zipCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    }

}
