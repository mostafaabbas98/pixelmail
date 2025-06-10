import { useEffect, useState } from "react";
import type { EmailListResponse } from "../types";
import { useMsal } from "@azure/msal-react";
import { GraphApiService } from "../services/graphApi";

export const useEmails = (count: number = 25) => {
  const { instance, accounts } = useMsal();
  const [emails, setEmails] = useState<EmailListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    if (accounts.length === 0) return;

    setLoading(true);
    setError(null);
    try {
      const graphService = new GraphApiService(instance);
      const emailsDate = await graphService.getEmails(count);
      setEmails(emailsDate);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [accounts.length, count]);

  return {
    emails: emails?.value || [],
    loading,
    error,
    refetch: fetchEmails,
    hasNextPage: !!emails?.["@odata.nextLink"],
  };
};
