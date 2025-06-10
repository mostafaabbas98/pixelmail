import { useEmails } from "../hooks/useEmails";
import type { FolderType } from "../services/graphApi";
import type { EmailMessage } from "../types";
import { formatTime } from "../utils/formatTime";
import { EmailSkeleton } from "./EmailSkeleton";

interface EmailListProps {
  selectedFolder: string;
  onSelectEmail: (emailId: string) => void;
  selectedEmailId: string | null;
}

const getImportanceIcon = (importance: string) => {
  switch (importance) {
    case "high":
      return "🔴";
    case "low":
      return "🔵";
    default:
      return null;
  }
};

export const EmailList = ({
  selectedFolder,
  onSelectEmail,
  selectedEmailId,
}: EmailListProps) => {
  const { emails, loading, error, refetch } = useEmails(
    selectedFolder as FolderType,
    100
  );

  const handleEmailClick = async (emailId: string) => {
    onSelectEmail?.(emailId);
  };

  if (loading) {
    return <EmailSkeleton count={8} />;
  }

  if (emails.length === 0 || error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-900 font-medium">No emails found</p>
          <p className="text-gray-500 text-sm mt-1">Your inbox is empty</p>
          <button
            onClick={refetch}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {selectedFolder}
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {emails.map((email: EmailMessage) => {
          const isSelected = selectedEmailId === email?.conversationId;
          const isUnread = !email.isRead;

          const timeFormatted = formatTime(email.receivedDateTime);

          return (
            <div
              key={email.id}
              onClick={() => handleEmailClick(email?.conversationId)}
              className={`
                relative p-4  cursor-pointer transition-all duration-200
                ${isSelected ? "bg-blue-200/20" : "hover:bg-gray-50"}
                ${isUnread ? "bg-white" : "bg-gray-50/50"}
              `}
            >
              {/* Unread indicator */}
              {isUnread && (
                <div className="absolute left-0 top-0 transform  w-1 h-full bg-blue-600 rounded-r"></div>
              )}

              <div className="flex items-start space-x-3 ml-2">
                {/* Sender Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`
                    h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium uppercase
                    ${isUnread ? "bg-blue-600" : "bg-gray-400"}
                  `}
                  >
                    {email.from?.emailAddress?.name?.charAt(0) ||
                      email.from?.emailAddress?.address?.charAt(0) ||
                      "?"}
                  </div>
                </div>

                {/* Email Content */}
                <div className="flex-1 min-w-0">
                  {/* Header: Sender, Time, and Importance */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <p
                        className={`
                        text-sm truncate
                        ${
                          isUnread
                            ? "font-semibold text-gray-900"
                            : "font-medium text-gray-700"
                        }
                      `}
                      >
                        {email.from?.emailAddress?.name ||
                          email.from?.emailAddress?.address ||
                          "Unknown Sender"}
                      </p>
                      {getImportanceIcon(email.importance) && (
                        <span className="flex-shrink-0">
                          {getImportanceIcon(email.importance)}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs text-gray-500 flex-shrink-0 ml-2"
                      title={timeFormatted.tooltip}
                    >
                      {timeFormatted.display}
                    </p>
                  </div>

                  {/* Subject */}
                  <p
                    className={`
                    text-sm truncate mb-1
                    ${
                      isUnread
                        ? "font-semibold text-gray-900"
                        : "font-normal text-gray-800"
                    }
                  `}
                  >
                    {email.subject || "(No Subject)"}
                  </p>

                  {/* Body Preview */}
                  <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">
                    {email.bodyPreview || "No preview available"}
                  </p>

                  {/* Status Indicators */}
                  <div className="flex items-center space-x-3">
                    {/* Unread dot */}
                    {isUnread && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-xs text-blue-600 font-medium">
                          Unread
                        </span>
                      </div>
                    )}

                    {/* Attachments */}
                    {email.hasAttachments && (
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-500">📎</span>
                        <span className="text-xs text-gray-500">
                          Attachment
                        </span>
                      </div>
                    )}

                    {/* Flag */}
                    {email.flag?.flagStatus === "flagged" && (
                      <div className="flex items-center space-x-1">
                        <span className="text-red-500">🚩</span>
                        <span className="text-xs text-red-500">Flagged</span>
                      </div>
                    )}

                    {/* Complete flag */}
                    {email.flag?.flagStatus === "complete" && (
                      <div className="flex items-center space-x-1">
                        <span className="text-green-500">✅</span>
                        <span className="text-xs text-green-500">Complete</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
