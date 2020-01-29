import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMessageUser1579988160889 implements MigrationInterface {
    name = 'fixMessageUser1579988160889'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "userId"`, undefined);
    }

}
