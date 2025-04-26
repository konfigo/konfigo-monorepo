import { graphql } from "@/graphql";

export const LoginMutationDocument = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`);
