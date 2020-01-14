import {MigrationInterface, QueryRunner} from "typeorm";

export class facebookUserPicture1579005746722 implements MigrationInterface {
    name = 'facebookUserPicture1579005746722'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookPicture" json`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookPicture"`, undefined);
    }

}
