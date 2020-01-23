import {MigrationInterface, QueryRunner} from "typeorm";

export class messageIsRemovedFlag1579806517722 implements MigrationInterface {
    name = 'messageIsRemovedFlag1579806517722'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" ADD "isRemoved" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "isRemoved"`, undefined);
    }

}
