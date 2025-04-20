import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class GetComponentInput {
  @Field(() => String, { nullable: true })
  parent?: string;
}

@ObjectType()
export class Component {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: Date;
}

@InputType()
export class CreateComponentInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  parentId?: string;
}
