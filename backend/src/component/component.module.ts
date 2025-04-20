import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Component } from "src/entities/component.entity";
import { ComponentResolver } from "./component.resolver";
import { ComponentService } from "./component.service";

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentResolver, ComponentService],
})
export class ComponentModule {}
