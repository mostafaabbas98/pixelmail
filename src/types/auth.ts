import type { UserProfile } from "./user";
import type { GraphApiService } from "../services/graphApi";

export type AuthUser = UserProfile;

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
  graphService: GraphApiService | null;
}
