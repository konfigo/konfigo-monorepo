import { graphql } from "@/graphql";

export const MeQueryDocument = graphql(`
  query Me {
    me {
      id
      username
    }
  }
`);
