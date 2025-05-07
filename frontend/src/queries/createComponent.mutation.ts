import { graphql } from "@/graphql";

export const CreateComponentMutationDocument = graphql(`
  mutation createComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      id
      name
      createdAt
    }
  }
`);
