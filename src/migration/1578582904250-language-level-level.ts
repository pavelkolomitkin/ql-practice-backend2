import {MigrationInterface, QueryRunner} from "typeorm";

export class languageLevelLevel1578582904250 implements MigrationInterface {
    name = 'languageLevelLevel1578582904250'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_level" ADD "level" smallint NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language_level" DROP COLUMN "level"`, undefined);
    }

}
