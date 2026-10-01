import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
