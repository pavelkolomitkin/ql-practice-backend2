import {MigrationInterface, QueryRunner} from "typeorm";

export class userAboutMe1579284966630 implements MigrationInterface {
    name = 'userAboutMe1579284966630'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "aboutMe" text`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "aboutMe"`, undefined);
    }
}
