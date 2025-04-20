import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStageDep1745156961294 implements MigrationInterface {
    name = 'RemoveStageDep1745156961294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_e19cb37198d1009e4bbf0a3acaa"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "stageId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" ADD "stageId" uuid`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_e19cb37198d1009e4bbf0a3acaa" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
