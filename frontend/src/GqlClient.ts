import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_KEYS } from "./util/constants";

const GRAPHQL_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const httpLink = createHttpLink({
  uri: GRAPHQL_BACKEND_URL,
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.log(networkError);
  } else {
    const errors = [...(graphQLErrors ? graphQLErrors : [])];

    if (errors?.some((e) => e.extensions?.code === "UNAUTHENTICATED")) {
      window.location.href = "/login";
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const gqlClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({}),
});
