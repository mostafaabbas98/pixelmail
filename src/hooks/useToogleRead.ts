import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { EmailMessage } from "../types/email";

interface OptimisticUpdateFunctions {
  updateEmailOptimistically: (
    emailId: string,
    updates: Partial<EmailMessage>
  ) => void;
  revertEmailUpdate: (emailId: string, originalEmail: EmailMessage) => void;
}

export const useToogleRead = (
  optimisticFunctions?: OptimisticUpdateFunctions
) => {
  const { graphService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRead = async (
    emailId: string,
    isRead: boolean,
    originalEmail?: EmailMessage
  ) => {
    if (!graphService) return;

    if (optimisticFunctions && originalEmail) {
      optimisticFunctions.updateEmailOptimistically(emailId, { isRead });
    }

    setIsLoading(true);
    setError(null);

    try {
      await graphService.toggleRead(emailId, isRead);
    } catch (error) {
      if (optimisticFunctions && originalEmail) {
        optimisticFunctions.revertEmailUpdate(emailId, originalEmail);
      }
      setError(
        error instanceof Error ? error.message : "Failed to update email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { toggleRead, isLoading, error };
};
