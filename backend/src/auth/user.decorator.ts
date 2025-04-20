import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserAccount } from "src/account/account.type";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    let user: UserAccount;

    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    user = gqlContext.req.user;

    return data ? user?.[data] : user;
  },
);
