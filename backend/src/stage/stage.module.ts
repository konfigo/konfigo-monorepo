import { Module } from "@nestjs/common";
import { StageResolver } from "./stage.resolver";
import { StageService } from "./stage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "src/entities/stage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  providers: [StageResolver, StageService],
  exports: [StageResolver, StageService],
})
export class StageModule {}
