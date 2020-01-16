import {MigrationInterface, QueryRunner} from "typeorm";

export class languageCode1578581575379 implements MigrationInterface {
    name = 'languageCode1578581575379'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language" ADD "code" character varying(2) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "code"`, undefined);
    }

}
