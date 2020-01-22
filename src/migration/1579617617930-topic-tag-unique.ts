import {MigrationInterface, QueryRunner} from "typeorm";

export class topicTagUnique1579617617930 implements MigrationInterface {
    name = 'topicTagUnique1579617617930'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic_tag" ADD CONSTRAINT "UQ_fea0da471f0a03b5aeb325142f8" UNIQUE ("title")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic_tag" DROP CONSTRAINT "UQ_fea0da471f0a03b5aeb325142f8"`, undefined);
    }

}
