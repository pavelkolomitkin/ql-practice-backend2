import {MigrationInterface, QueryRunner} from "typeorm";

export class extractTimestampable1582125451886 implements MigrationInterface {
    name = 'extractTimestampable1582125451886'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "timeCreatedat" TIMESTAMP DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "timeUpdatedat" TIMESTAMP DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "timeCreatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "timeUpdatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "timeCreatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "timeUpdatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "timeCreatedat" TIMESTAMP DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "timeUpdatedat" TIMESTAMP DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "timeCreatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "timeUpdatedat" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "timeUpdatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" DROP COLUMN "timeCreatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "timeUpdatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "timeCreatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "timeUpdatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" DROP COLUMN "timeCreatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "timeUpdatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP COLUMN "timeCreatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "timeUpdatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "timeCreatedat"`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "public_conversation" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "language_skill" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

}
