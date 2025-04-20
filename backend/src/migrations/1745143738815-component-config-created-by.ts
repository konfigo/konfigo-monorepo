import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentConfigCreatedBy1745143738815 implements MigrationInterface {
    name = 'ComponentConfigCreatedBy1745143738815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "config" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_81fae482c1ccfdfdac0c51650de" FOREIGN KEY ("createdBy") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "config" ADD CONSTRAINT "FK_5cb0a55420b47b8b5b56829a4d3" FOREIGN KEY ("createdBy") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "config" DROP CONSTRAINT "FK_5cb0a55420b47b8b5b56829a4d3"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_81fae482c1ccfdfdac0c51650de"`);
        await queryRunner.query(`ALTER TABLE "config" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "createdBy"`);
    }

}
