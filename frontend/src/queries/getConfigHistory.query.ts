import { graphql } from "@/graphql";

export const GetConfigHistoryQueryDocument = graphql(`
  query GetConfigHistory($input: GetHistoryForConfig!) {
    getConfigHistory(input: $input) {
      id
      payload
      commitMessage
      revision
      createdAt
    }
  }
`);
