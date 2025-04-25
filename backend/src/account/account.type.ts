import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;
}

@ObjectType()
export class UserAccount {
  @Field()
  id: string;

  @Field()
  username: string;
}
