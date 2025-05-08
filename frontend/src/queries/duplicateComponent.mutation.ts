import { graphql } from "@/graphql";

export const DuplicateComponentMutationDocument = graphql(`
  mutation DuplicateComponent($id: String!) {
    duplicateComponent(id: $id) {
      id
      name
    }
  }
`);
