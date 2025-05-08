import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentOnDelete1746711801406 implements MigrationInterface {
    name = 'ComponentOnDelete1746711801406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_d253fc7b4db155e85e82c69da55"`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_d253fc7b4db155e85e82c69da55" FOREIGN KEY ("parentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_d253fc7b4db155e85e82c69da55"`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_d253fc7b4db155e85e82c69da55" FOREIGN KEY ("parentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
