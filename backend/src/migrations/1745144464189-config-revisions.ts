import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfigRevisions1745144464189 implements MigrationInterface {
    name = 'ConfigRevisions1745144464189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "config" ADD "commitMessage" text NOT NULL DEFAULT 'initial commit'`);
        await queryRunner.query(`ALTER TABLE "config" ADD "revision" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "config" DROP COLUMN "revision"`);
        await queryRunner.query(`ALTER TABLE "config" DROP COLUMN "commitMessage"`);
    }

}
