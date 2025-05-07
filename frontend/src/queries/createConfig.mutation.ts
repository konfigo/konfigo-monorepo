import { graphql } from "@/graphql";

export const CreateComponentConfigMutationDocument = graphql(`
  mutation createComponentConfig($input: CreateConfigInput!) {
    createComponentConfig(input: $input) {
      id
      payload
      commitMessage
      revision
    }
  }
`);
