import {MigrationInterface, QueryRunner} from "typeorm";

export class publicConversationCreatedUpdated1579877497132 implements MigrationInterface {
    name = 'publicConversationCreatedUpdated1579877497132'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "createdAt"`, undefined);
    }

}
