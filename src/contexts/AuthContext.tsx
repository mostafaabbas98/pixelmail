/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, AuthUser } from "../types/auth";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { GraphApiService } from "../services/graphApi";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [graphService, setGraphService] = useState<GraphApiService | null>(
    null
  );

  const login = async () => {
    try {
      setError(null);
      await instance.loginPopup(loginRequest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed!");
    }
  };

  const logout = () => {
    if (accounts.length > 0) {
      instance.clearCache({
        account: accounts[0],
      });
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      if (accounts.length > 0) {
        try {
          setIsLoading(true);
          const graphService = new GraphApiService(instance);
          setGraphService(graphService);
          const userProfile = await graphService.getUserProfile();

          setUser({
            id: userProfile.id,
            name: userProfile.displayName,
            email: userProfile.mail || userProfile.userPrincipalName,
            givenName: userProfile.givenName,
            surname: userProfile.surname,
            jobTitle: userProfile.jobTitle,
          });
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load user profile"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [accounts, instance]);

  const userContextValues: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    clearError,
    graphService,
  };

  return (
    <AuthContext.Provider value={userContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
