import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  ComponentConfig,
  CreateConfigInput,
  GetHistoryForConfig,
} from "./component-config.type";
import { ComponentConfigService } from "./component-config.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(ComponentConfig)
@UseGuards(AuthGuard)
export class ComponentConfigResolver {
  constructor(private componentConfigService: ComponentConfigService) {}

  @Query(() => [ComponentConfig])
  async getConfigHistory(
    @Args("input", { type: () => GetHistoryForConfig })
    input: GetHistoryForConfig,
  ): Promise<ComponentConfig[]> {
    return this.componentConfigService.getHistoryForConfig(input);
  }

  @Mutation(() => ComponentConfig)
  async createComponentConfig(
    @Args("input", { type: () => CreateConfigInput }) input: CreateConfigInput,
  ) {
    return this.componentConfigService.createComponentConfig(input);
  }
}
