import { MigrationInterface, QueryRunner } from "typeorm";

export class addNullConstraintToDescription1677167601348 implements MigrationInterface {
    name = 'addNullConstraintToDescription1677167601348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "description" SET NOT NULL`);
    }

}
