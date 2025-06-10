import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { EmailList } from "./EmailList";
import { EmailView } from "./EmailView";

type Folder = "inbox" | "sent" | "drafts" | "archive" | "trash";

export const EmailApp = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setSelectedEmailId(null);
  };

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmailId(emailId);
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
        selectedEmailId={selectedEmailId}
        onSelectEmail={handleSelectEmail}
      />
      <EmailView selectedEmailId={selectedEmailId || null} />
    </div>
  );
};
