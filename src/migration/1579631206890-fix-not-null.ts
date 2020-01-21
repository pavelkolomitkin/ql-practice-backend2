import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNotNull1579631206890 implements MigrationInterface {
    name = 'fixNotNull1579631206890'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "confirmation_key" DROP CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3"`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "confirmation_key" ADD CONSTRAINT "FK_fb719dd1098e3c968a8ce966bf3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
