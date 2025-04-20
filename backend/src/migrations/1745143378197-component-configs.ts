import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentConfigs1745143378197 implements MigrationInterface {
    name = 'ComponentConfigs1745143378197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "parentId" uuid, CONSTRAINT "component_name_parent_unique" UNIQUE ("name", "parentId"), CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "component_parent_index" ON "component" ("parentId") `);
        await queryRunner.query(`CREATE TABLE "config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "payload" text NOT NULL DEFAULT '{}', "componentId" uuid, CONSTRAINT "PK_d0ee79a681413d50b0a4f98cf7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "config_component_index" ON "config" ("componentId") `);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_d253fc7b4db155e85e82c69da55" FOREIGN KEY ("parentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "config" ADD CONSTRAINT "FK_59ced7cb86bc95116010eb12ae6" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "config" DROP CONSTRAINT "FK_59ced7cb86bc95116010eb12ae6"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_d253fc7b4db155e85e82c69da55"`);
        await queryRunner.query(`DROP INDEX "public"."config_component_index"`);
        await queryRunner.query(`DROP TABLE "config"`);
        await queryRunner.query(`DROP INDEX "public"."component_parent_index"`);
        await queryRunner.query(`DROP TABLE "component"`);
    }

}
