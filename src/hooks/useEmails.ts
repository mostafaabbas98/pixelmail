import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { FolderType } from "../services/graphApi";
import type { EmailMessage } from "../types/email";

export const useEmails = (folder: FolderType, pageSize: number = 25) => {
  const { graphService, isAuthenticated } = useAuth();
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchEmails = async (reset: boolean = false) => {
    if (!isAuthenticated || !graphService) return;

    const currentSkip = reset ? 0 : emails.length;

    if (reset) {
      setLoading(true);
      setEmails([]);
      setHasNextPage(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const emailsData = await graphService.getEmailsByFolder(
        folder,
        pageSize,
        currentSkip
      );

      setEmails((prevEmails) =>
        reset ? emailsData.value : [...prevEmails, ...emailsData.value]
      );

      // If we got fewer emails than requested, we've reached the end
      setHasNextPage(emailsData.value.length === pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNextPage) {
      fetchEmails(false);
    }
  }, [loadingMore, hasNextPage, emails.length]);

  const refetch = useCallback(() => {
    fetchEmails(true);
  }, [folder, pageSize]);

  const updateEmailOptimistically = (
    emailId: string,
    updates: Partial<EmailMessage>
  ) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, ...updates } : email
      )
    );
  };

  const revertEmailUpdate = (emailId: string, originalEmail: EmailMessage) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => (email.id === emailId ? originalEmail : email))
    );
  };

  useEffect(() => {
    fetchEmails(true);
  }, [isAuthenticated, graphService, folder]);

  return {
    emails,
    loading,
    loadingMore,
    error,
    hasNextPage,
    loadMore,
    refetch,
    updateEmailOptimistically,
    revertEmailUpdate,
  };
};
