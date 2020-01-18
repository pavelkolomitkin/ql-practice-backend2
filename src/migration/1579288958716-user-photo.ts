import {MigrationInterface, QueryRunner} from "typeorm";

export class userPhoto1579288958716 implements MigrationInterface {
    name = 'userPhoto1579288958716'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photoEncoding" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoMimetype" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoOriginalname" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoSize" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoFilename" character varying(255)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoFilename"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoSize"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoOriginalname"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoMimetype"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoEncoding"`, undefined);
    }

}
