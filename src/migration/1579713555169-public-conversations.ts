import {MigrationInterface, QueryRunner} from "typeorm";

export class publicConversations1579713555169 implements MigrationInterface {
    name = 'publicConversations1579713555169'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text, "type" character varying NOT NULL, "pictureEncoding" character varying(50), "pictureMimetype" character varying(50), "pictureOriginalname" character varying(255), "pictureSize" integer, "pictureFilename" character varying(255), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "public_conversation" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "ownerId" integer NOT NULL, "languageId" integer NOT NULL, CONSTRAINT "PK_eacaf50388bda45e7f8fc6041ca" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "public_conversation_message" ("id" SERIAL NOT NULL, "conversationId" integer, "messageId" integer, CONSTRAINT "UQ_fd8b17efb39f6b6f3f908919c45" UNIQUE ("messageId"), CONSTRAINT "PK_a54fdd073596bd486f6ab9d99e6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "public_conversation_tags_topic_tag" ("publicConversationId" integer NOT NULL, "topicTagId" integer NOT NULL, CONSTRAINT "PK_6b1aad27f615f2ed5c907ad90d8" PRIMARY KEY ("publicConversationId", "topicTagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a0505273fededdc78e6a13f69d" ON "public_conversation_tags_topic_tag" ("publicConversationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ee684f86898ddade4f9328ba04" ON "public_conversation_tags_topic_tag" ("topicTagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD CONSTRAINT "FK_5fbbf56d0714a9c4e689d291678" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD CONSTRAINT "FK_79a38ee5049fc9efe668611f703" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_message" ADD CONSTRAINT "FK_ef5d09c837fa091daea7dae5b34" FOREIGN KEY ("conversationId") REFERENCES "public_conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_message" ADD CONSTRAINT "FK_fd8b17efb39f6b6f3f908919c45" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_tags_topic_tag" ADD CONSTRAINT "FK_a0505273fededdc78e6a13f69d0" FOREIGN KEY ("publicConversationId") REFERENCES "public_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_tags_topic_tag" ADD CONSTRAINT "FK_ee684f86898ddade4f9328ba04a" FOREIGN KEY ("topicTagId") REFERENCES "topic_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation_tags_topic_tag" DROP CONSTRAINT "FK_ee684f86898ddade4f9328ba04a"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_tags_topic_tag" DROP CONSTRAINT "FK_a0505273fededdc78e6a13f69d0"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_message" DROP CONSTRAINT "FK_fd8b17efb39f6b6f3f908919c45"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation_message" DROP CONSTRAINT "FK_ef5d09c837fa091daea7dae5b34"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP CONSTRAINT "FK_79a38ee5049fc9efe668611f703"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP CONSTRAINT "FK_5fbbf56d0714a9c4e689d291678"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ee684f86898ddade4f9328ba04"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a0505273fededdc78e6a13f69d"`, undefined);
        await queryRunner.query(`DROP TABLE "public_conversation_tags_topic_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "public_conversation_message"`, undefined);
        await queryRunner.query(`DROP TABLE "public_conversation"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
    }

}
