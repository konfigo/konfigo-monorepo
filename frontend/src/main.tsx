import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/state/store.ts";

import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "./GqlClient.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ApolloProvider client={gqlClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
);
