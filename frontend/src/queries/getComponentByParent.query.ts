import { graphql } from "@/graphql";

export const GetComponentByParentQueryDocument = graphql(`
  query GetComponentByParent($input: GetComponentInput!) {
    getComponentByParent(input: $input) {
      id
      name
      createdAt
    }
  }
`);
