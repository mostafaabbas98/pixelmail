import { useMsal } from "@azure/msal-react";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback: ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { accounts } = useMsal();

  if (accounts.length > 0) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
