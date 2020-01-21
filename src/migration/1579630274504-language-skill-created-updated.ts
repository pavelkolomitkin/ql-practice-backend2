import {MigrationInterface, QueryRunner} from "typeorm";

export class languageSkillCreatedUpdated1579630274504 implements MigrationInterface {
    name = 'languageSkillCreatedUpdated1579630274504'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "createdAt"`, undefined);
    }

}
