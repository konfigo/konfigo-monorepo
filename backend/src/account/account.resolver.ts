import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { LoginInput, LoginOutput, UserAccount } from "./account.type";
import { Account } from "src/entities/account.entity";
import { User } from "src/auth/user.decorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => LoginOutput)
  async login(@Args("input") input: LoginInput): Promise<LoginOutput> {
    return this.accountService.login(input);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserAccount)
  async me(@User() user: UserAccount): Promise<UserAccount> {
    return this.accountService.me(user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserAccount])
  async getAccounts(@User() user: UserAccount): Promise<UserAccount[]> {
    return this.accountService.getAll(user);
  }
}
