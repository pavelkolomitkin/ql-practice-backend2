import {MigrationInterface, QueryRunner} from "typeorm";

export class facebookUserFields1578995716198 implements MigrationInterface {
    name = 'facebookUserFields1578995716198'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_31ef2b4d30675d0c15056b7f6e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookAccesstoken" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookAccesstokensource" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookApplicationid" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookDataaccessexpirationtime" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookDeclinedpermissions" text`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookExpirationtime" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookExpiredpermissions" text`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookLastrefreshtime" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookPermissions" text`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookUserid" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isBlocked" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isBlocked" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookUserid"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookPermissions"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookLastrefreshtime"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookExpiredpermissions"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookExpirationtime"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookDeclinedpermissions"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookDataaccessexpirationtime"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookApplicationid"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookAccesstokensource"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookAccesstoken"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `, undefined);
    }

}
