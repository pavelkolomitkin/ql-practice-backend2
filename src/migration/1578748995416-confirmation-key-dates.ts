import {MigrationInterface, QueryRunner} from "typeorm";

export class confirmationKeyDates1578748995416 implements MigrationInterface {
    name = 'confirmationKeyDates1578748995416'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "createdAt"`, undefined);
    }

}
