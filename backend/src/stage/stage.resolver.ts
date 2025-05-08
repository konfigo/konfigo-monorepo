import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStageInput, CreateStagesInput, Stage } from "./stage.type";
import { StageService } from "./stage.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(Stage)
@UseGuards(AuthGuard)
export class StageResolver {
  constructor(private _stageService: StageService) {}

  @Query(() => [Stage])
  async getStages(): Promise<Stage[]> {
    return this._stageService.getStages();
  }

  @Mutation(() => Stage)
  async createStage(@Args("input") input: CreateStageInput) {
    return this._stageService.createStage(input);
  }

  @Mutation(() => [Stage])
  async createStages(@Args("input") input: CreateStagesInput) {
    return this._stageService.createStages(input);
  }
}
