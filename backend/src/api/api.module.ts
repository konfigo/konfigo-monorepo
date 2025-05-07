import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ComponentModule } from "src/component/component.module";
import { ComponentConfigModule } from "src/component-config/component-config.module";
import { ApiService } from "./api.service";

@Module({
  imports: [ComponentModule, ComponentConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
