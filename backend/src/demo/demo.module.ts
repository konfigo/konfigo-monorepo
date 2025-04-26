import { Module } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { Stage } from "src/entities/stage.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Config } from "src/entities/config.entity";
import { Component } from "src/entities/component.entity";
import { Account } from "src/entities/account.entity";
import { AccountService } from "src/account/account.service";

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Config, Component, Account])],
  providers: [DemoService, AccountService],
})
export class DemoModule {}
