import {MigrationInterface, QueryRunner} from "typeorm";

export class languageSkillNotNullableFields1579630797832 implements MigrationInterface {
    name = 'languageSkillNotNullableFields1579630797832'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_40cdba0d1880a6ab23261019811"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_df89ef9c6311875511844088205"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_0b46fc730d05a23eff07402f35f"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "languageId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "levelId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98" UNIQUE ("userId", "languageId")`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_40cdba0d1880a6ab23261019811" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_df89ef9c6311875511844088205" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_0b46fc730d05a23eff07402f35f" FOREIGN KEY ("levelId") REFERENCES "language_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_0b46fc730d05a23eff07402f35f"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_df89ef9c6311875511844088205"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "FK_40cdba0d1880a6ab23261019811"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "levelId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "languageId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "UQ_0bff3bb5172048a8d5f48bc6c98" UNIQUE ("userId", "languageId")`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_0b46fc730d05a23eff07402f35f" FOREIGN KEY ("levelId") REFERENCES "language_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_df89ef9c6311875511844088205" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD CONSTRAINT "FK_40cdba0d1880a6ab23261019811" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
