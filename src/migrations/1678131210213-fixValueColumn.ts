import { MigrationInterface, QueryRunner } from "typeorm";

export class fixValueColumn1678131210213 implements MigrationInterface {
    name = 'fixValueColumn1678131210213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "value" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "value" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "value" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "value" TYPE numeric`);
    }

}
