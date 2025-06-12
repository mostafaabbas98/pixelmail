import { useEffect, useState } from "react";
import type { EmailListResponse } from "../types";
import { useAuth } from "../contexts/AuthContext";
import type { FolderType } from "../services/graphApi";
import type { EmailMessage } from "../types/email";

export const useEmails = (folder: FolderType, count: number = 25) => {
  const { graphService, isAuthenticated } = useAuth();
  const [emails, setEmails] = useState<EmailListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    if (!isAuthenticated || !graphService) return;

    setLoading(true);
    setError(null);
    try {
      const emailsDate = await graphService.getEmailsByFolder(folder, count);
      setEmails(emailsDate);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateEmailOptimistically = (
    emailId: string,
    updates: Partial<EmailMessage>
  ) => {
    setEmails((prevEmails) => {
      if (!prevEmails) return prevEmails;

      return {
        ...prevEmails,
        value: prevEmails.value.map((email) =>
          email.id === emailId ? { ...email, ...updates } : email
        ),
      };
    });
  };

  const revertEmailUpdate = (emailId: string, originalEmail: EmailMessage) => {
    setEmails((prevEmails) => {
      if (!prevEmails) return prevEmails;

      return {
        ...prevEmails,
        value: prevEmails.value.map((email) =>
          email.id === emailId ? originalEmail : email
        ),
      };
    });
  };

  useEffect(() => {
    fetchEmails();
  }, [isAuthenticated, graphService, folder, count]);

  return {
    emails: emails?.value || [],
    loading,
    error,
    refetch: fetchEmails,
    hasNextPage: !!emails?.["@odata.nextLink"],
    updateEmailOptimistically,
    revertEmailUpdate,
  };
};
