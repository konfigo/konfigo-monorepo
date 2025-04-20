import { MigrationInterface, QueryRunner } from "typeorm";

export class Stage1745145417027 implements MigrationInterface {
    name = 'Stage1745145417027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" uuid, CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component" ADD "stageId" uuid`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_e19cb37198d1009e4bbf0a3acaa" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage" ADD CONSTRAINT "FK_632ff1e82c335b5f15cc417e440" FOREIGN KEY ("createdBy") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stage" DROP CONSTRAINT "FK_632ff1e82c335b5f15cc417e440"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_e19cb37198d1009e4bbf0a3acaa"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "stageId"`);
        await queryRunner.query(`DROP TABLE "stage"`);
    }

}
