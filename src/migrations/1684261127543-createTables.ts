import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1684261127543 implements MigrationInterface {
    name = 'CreateTables1684261127543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "codes_processed" ("codigos" character varying(14) NOT NULL, CONSTRAINT "PK_5d967794c783721e34b014d417b" PRIMARY KEY ("codigos"))`);
        await queryRunner.query(`ALTER TABLE "codes_to_process" ALTER COLUMN "codigos" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "codes_to_process" ADD CONSTRAINT "PK_245705c9ad3202e001ea0856ebb" PRIMARY KEY ("codigos")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codes_to_process" DROP CONSTRAINT "PK_245705c9ad3202e001ea0856ebb"`);
        await queryRunner.query(`ALTER TABLE "codes_to_process" ALTER COLUMN "codigos" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "codes_processed"`);
    }

}
