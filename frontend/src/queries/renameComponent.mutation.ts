import { graphql } from "@/graphql";

export const RenameComponentMutationDocument = graphql(`
  mutation RenameComponent($id: String!, $newName: String!) {
    renameComponent(id: $id, newName: $newName) {
      id
      name
    }
  }
`);
