import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { ComponentService } from "./component.service";
import {
  Component,
  CreateComponentInput,
  GetComponentInput,
} from "./component.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/auth/user.decorator";
import { UserAccount } from "src/account/account.type";

@Resolver(Component)
@UseGuards(AuthGuard)
export class ComponentResolver {
  constructor(private _componentService: ComponentService) {}

  @Query(() => [Component])
  async getComponentByParent(
    @Args("input", { type: () => GetComponentInput }) input: GetComponentInput,
  ) {
    return this._componentService.getComponentByParent(input);
  }

  @Mutation(() => Component)
  async createComponent(
    @Args("input", { type: () => CreateComponentInput })
    input: CreateComponentInput,
    @User() user: UserAccount,
  ) {
    return this._componentService.createComponent(input, user);
  }

  @Mutation(() => Component)
  async renameComponent(
    @Args("id", { type: () => String }) id: string,
    @Args("newName", { type: () => String }) newName: string,
  ) {
    return this._componentService.renameComponent(id, newName);
  }

  @Mutation(() => Component)
  async duplicateComponent(
    @Args("id", { type: () => String }) id: string,
    @User() user,
  ) {
    return this._componentService.duplicateComponent(id, user);
  }
}
