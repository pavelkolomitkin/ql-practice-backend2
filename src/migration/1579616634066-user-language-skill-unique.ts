import {MigrationInterface, QueryRunner} from "typeorm";

export class userLanguageSkillUnique1579616634066 implements MigrationInterface {
    name = 'userLanguageSkillUnique1579616634066'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98" UNIQUE ("userId", "languageId")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98"`, undefined);
    }

}
