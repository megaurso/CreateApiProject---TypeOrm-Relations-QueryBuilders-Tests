import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEntity1678202890889 implements MigrationInterface {
    name = 'updateEntity1678202890889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "number" character varying(7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "number" character varying(6)`);
    }

}
