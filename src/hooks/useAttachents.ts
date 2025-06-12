import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { AttachmentResponse } from "../types";

export const useAttachments = (emailId: string) => {
  const { graphService, isAuthenticated } = useAuth();
  const [attachments, setAttachments] = useState<AttachmentResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachments = async () => {
    if (!isAuthenticated || !graphService) return;

    setLoading(true);
    setError(null);
    try {
      const res = await graphService.getAttachments(emailId);
      setAttachments(res);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [isAuthenticated, emailId]);

  return {
    attachments: attachments?.value || [],
    loading,
    error,
    refetch: fetchAttachments,
  };
};
