import { createContext } from "react";
import type { User } from "firebase/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
