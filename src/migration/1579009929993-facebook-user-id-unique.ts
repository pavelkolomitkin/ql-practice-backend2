import {MigrationInterface, QueryRunner} from "typeorm";

export class facebookUserIdUnique1579009929993 implements MigrationInterface {
    name = 'facebookUserIdUnique1579009929993'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_32ebdc23978622395b70aa70103" UNIQUE ("facebookUserid")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_32ebdc23978622395b70aa70103"`, undefined);
    }

}
