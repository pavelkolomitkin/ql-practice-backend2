import {MigrationInterface, QueryRunner} from "typeorm";

export class languageLevels1578582962549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(`INSERT INTO "language_level"(id, title, code, "level") VALUES(1, 'Beginner', 'beginner', 0)`);
        await queryRunner.query(`INSERT INTO "language_level"(id, title, code, "level") VALUES(2, 'Elementary', 'elementary', 1)`);
        await queryRunner.query(`INSERT INTO "language_level"(id, title, code, "level") VALUES(3, 'Intermediate', 'intermediate', 2)`);
        await queryRunner.query(`INSERT INTO "language_level"(id, title, code, "level") VALUES(4, 'Advanced', 'advanced', 3)`);
        await queryRunner.query(`INSERT INTO "language_level"(id, title, code, "level") VALUES(5, 'Native', 'native', 4)`);

        await queryRunner.query(`SELECT setval('language_level_id_seq', 6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(`TRUNCATE TABLE "language_level" CASCADE`);

    }

}
