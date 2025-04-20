import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ComponentConfig {
  @Field()
  id: string;

  @Field()
  payload: string;

  @Field()
  commitMessage: string;

  @Field(() => Int)
  revision: number;

  @Field()
  createdAt: Date;
}

@InputType()
export class GetHistoryForConfig {
  @Field()
  componentId: string;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

@InputType()
export class CreateConfigInput {
  @Field()
  componentId: string;

  @Field()
  payload: string;

  @Field()
  commitMessage: string;
}
