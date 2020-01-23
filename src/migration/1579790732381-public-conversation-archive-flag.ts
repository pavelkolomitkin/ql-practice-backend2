import {MigrationInterface, QueryRunner} from "typeorm";

export class publicConversationArchiveFlag1579790732381 implements MigrationInterface {
    name = 'publicConversationArchiveFlag1579790732381'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "isArchived" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "isArchived"`, undefined);
    }

}
