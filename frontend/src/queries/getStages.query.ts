import { graphql } from "@/graphql";

export const GetStagesQueryDocument = graphql(`
  query GetStages {
    getStages {
      id
      name
      createdAt
    }
  }
`);
