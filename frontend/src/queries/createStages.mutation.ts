import { graphql } from "@/graphql";

export const CreateStagesMutationDocument = graphql(`
  mutation CreateStages($input: CreateStagesInput!) {
    createStages(input: $input) {
      id
      name
    }
  }
`);
