import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1684331539004 implements MigrationInterface {
    name = 'CreateTables1684331539004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(20) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "credits" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rastreio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo" character varying(14) NOT NULL, "data_de_postagem" character varying(20) NOT NULL, "descricao_inicial" character varying(100) NOT NULL, "endereco_envio" character varying(100) NOT NULL, "data_last_review" character varying(20) NOT NULL, "ultima_descricao" character varying(100) NOT NULL, "endereco_final" character varying(100) NOT NULL, "userId" integer, CONSTRAINT "PK_a046decc1b8a65d6bc3eeb5bc96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rastreio" ADD CONSTRAINT "FK_a6664aa363cb72e6d60e1f3a4fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rastreio" DROP CONSTRAINT "FK_a6664aa363cb72e6d60e1f3a4fb"`);
        await queryRunner.query(`DROP TABLE "rastreio"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
