import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { LoginInput, LoginOutput } from "./account.type";
import { Account } from "src/entities/account.entity";

@Resolver(Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => LoginOutput)
  async login(@Args("input") input: LoginInput): Promise<LoginOutput> {
    return this.accountService.login(input);
  }

  @Query(() => String)
  async test(): Promise<string> {
    return "TEST";
  }
}
