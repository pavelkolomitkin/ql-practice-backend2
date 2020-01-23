import {MigrationInterface, QueryRunner} from "typeorm";

export class publicConversationBannedUsers1579792080031 implements MigrationInterface {
    name = 'publicConversationBannedUsers1579792080031'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "public_conversation_banned_users_user" ("publicConversationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c7f6fccbb9f0448686867ed914d" PRIMARY KEY ("publicConversationId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_51368e966a4083a6892eb9f0b4" ON "public_conversation_banned_users_user" ("publicConversationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5c7752760a1ba3784b58c54311" ON "public_conversation_banned_users_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_banned_users_user" ADD CONSTRAINT "FK_51368e966a4083a6892eb9f0b45" FOREIGN KEY ("publicConversationId") REFERENCES "public_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_banned_users_user" ADD CONSTRAINT "FK_5c7752760a1ba3784b58c543110" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation_banned_users_user" DROP CONSTRAINT "FK_5c7752760a1ba3784b58c543110"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_banned_users_user" DROP CONSTRAINT "FK_51368e966a4083a6892eb9f0b45"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5c7752760a1ba3784b58c54311"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_51368e966a4083a6892eb9f0b4"`, undefined);
        await queryRunner.query(`DROP TABLE "public_conversation_banned_users_user"`, undefined);
    }

}
