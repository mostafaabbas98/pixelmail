import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { EmailList } from "./EmailList";
import { EmailView } from "./EmailView";
import { useUrlParams } from "../hooks/useUrlParams";
import type { EmailMessage } from "../types/email";

type Folder = "inbox" | "spam" | "sent" | "drafts" | "archive" | "trash";

export const EmailApp = () => {
  const { params, updateParams, removeParam } = useUrlParams();
  const [selectedFolder, setSelectedFolder] = useState<Folder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);

  useEffect(() => {
    const folder = params.get("folder") as Folder;

    if (
      folder &&
      ["inbox", "spam", "sent", "drafts", "archive", "trash"].includes(folder)
    ) {
      setSelectedFolder(folder);
    }
  }, [params]);

  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setSelectedEmail(null);
    updateParams("folder", folder);
    removeParam("email");
  };

  const handleSelectEmail = (email: EmailMessage) => {
    setSelectedEmail(email);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar
        selectedFolder={selectedFolder}
        setSelectedFolder={(folder: string) =>
          handleSelectFolder(folder as Folder)
        }
      />
      <EmailList
        selectedFolder={selectedFolder}
        selectedEmail={selectedEmail}
        onSelectEmail={handleSelectEmail}
      />
      <EmailView selectedEmail={selectedEmail} />
    </div>
  );
};
