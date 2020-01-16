import {MigrationInterface, QueryRunner} from "typeorm";

export class languageSkill1577031369887 implements MigrationInterface {
    name = 'languageSkill1577031369887'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "language_level" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "code" character varying(30) NOT NULL, CONSTRAINT "PK_9171b9f17b9a3679a2a61c059c6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "topic_tag" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, CONSTRAINT "PK_81c2829cc0986dba7cdd4800827" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "language_skill" ("id" SERIAL NOT NULL, "userId" integer, "languageId" integer, "levelId" integer, CONSTRAINT "PK_9c12df83206c784226cff763ef2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "language_skill_tags_topic_tag" ("languageSkillId" integer NOT NULL, "topicTagId" integer NOT NULL, CONSTRAINT "PK_a543f13736e6d98fc20fbd1b159" PRIMARY KEY ("languageSkillId", "topicTagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_230d4d008f9dfd03e8aa990128" ON "language_skill_tags_topic_tag" ("languageSkillId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6fd90c35732a09f2d9a96d6da" ON "language_skill_tags_topic_tag" ("topicTagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_40cdba0d1880a6ab23261019811" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_df89ef9c6311875511844088205" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_0b46fc730d05a23eff07402f35f" FOREIGN KEY ("levelId") REFERENCES "language_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill_tags_topic_tag" ADD CONSTRAINT "FK_230d4d008f9dfd03e8aa9901289" FOREIGN KEY ("languageSkillId") REFERENCES "language_skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill_tags_topic_tag" ADD CONSTRAINT "FK_d6fd90c35732a09f2d9a96d6da0" FOREIGN KEY ("topicTagId") REFERENCES "topic_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill_tags_topic_tag" DROP CONSTRAINT "FK_d6fd90c35732a09f2d9a96d6da0"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill_tags_topic_tag" DROP CONSTRAINT "FK_230d4d008f9dfd03e8aa9901289"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_0b46fc730d05a23eff07402f35f"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_df89ef9c6311875511844088205"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_40cdba0d1880a6ab23261019811"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d6fd90c35732a09f2d9a96d6da"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_230d4d008f9dfd03e8aa990128"`, undefined);
        await queryRunner.query(`DROP TABLE "language_skill_tags_topic_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "language_skill"`, undefined);
        await queryRunner.query(`DROP TABLE "topic_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "language_level"`, undefined);
        await queryRunner.query(`DROP TABLE "language"`, undefined);
    }

}
