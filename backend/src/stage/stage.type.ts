import { ObjectType, Field, InputType } from "@nestjs/graphql";

@ObjectType()
export class Stage {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: Date;
}

@InputType()
export class CreateStageInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
