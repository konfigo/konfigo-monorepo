import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Config } from "src/entities/config.entity";
import { ComponentConfigService } from "./component-config.service";
import { ComponentConfigComponentResolver } from "./component.resolver";
import { ComponentConfigResolver } from "./component-config.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [
    ComponentConfigService,
    ComponentConfigResolver,
    ComponentConfigComponentResolver,
  ],
  exports: [
    ComponentConfigService,
    ComponentConfigResolver,
    ComponentConfigComponentResolver,
  ],
})
export class ComponentConfigModule {}
