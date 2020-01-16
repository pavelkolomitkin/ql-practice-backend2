import {MigrationInterface, QueryRunner} from "typeorm";

export class users1576869846732 implements MigrationInterface {
    name = 'users1576869846732'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255), "password" character(60), "isActive" boolean NOT NULL DEFAULT false, "fullName" character varying(250) NOT NULL, "lastActivity" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isBlocked" boolean DEFAULT false, "type" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "confirmation_key" ("id" SERIAL NOT NULL, "type" character varying(20) NOT NULL, "value" character(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_76bca972d9a683ff3d981f249f2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3"`, undefined);
        await queryRunner.query(`DROP TABLE "confirmation_key"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_31ef2b4d30675d0c15056b7f6e"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
