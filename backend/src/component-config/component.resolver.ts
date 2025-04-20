import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Component } from "src/component/component.type";
import { ComponentConfigService } from "./component-config.service";
import { ComponentConfig } from "./component-config.type";

@Resolver(Component)
export class ComponentConfigComponentResolver {
  constructor(private componentConfigService: ComponentConfigService) {}

  @ResolveField(() => ComponentConfig, { name: "config" })
  async componentConfig(@Parent() component: Component) {
    return this.componentConfigService.getLatestConfigForComponent(component);
  }
}
