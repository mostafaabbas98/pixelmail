export interface EmailMessage {
  id: string;
  conversationId: string;
  subject: string;
  bodyPreview: string;
  body: {
    contentType: string;
    content: string;
  };
  from: {
    emailAddress: {
      address: string;
      name: string;
    };
  };
  toRecipients: Array<{
    emailAddress: {
      address: string;
      name: string;
    };
  }>;
  receivedDateTime: string;
  isRead: boolean;
  hasAttachments: boolean;
  importance: "low" | "normal" | "high";
  flag: {
    flagStatus: "notFlagged" | "complete" | "flagged";
  };
}
