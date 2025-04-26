import { createContext } from "react";

export interface Account {
  id: string;
  username: string;
}

export interface AuthContextProps {
  loading: boolean;
  me?: Account;
}

export const AuthContext = createContext<AuthContextProps>({
  loading: true,
});
