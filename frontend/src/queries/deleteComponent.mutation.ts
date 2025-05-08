import { graphql } from "@/graphql";

export const DeleteComponentMutationDocument = graphql(`
  mutation DeleteComponent($id: String!) {
    deleteComponent(id: $id)
  }
`);
