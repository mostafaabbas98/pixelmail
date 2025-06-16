import { useEmails } from "../hooks/useEmails";
import { useToogleRead } from "../hooks/useToogleRead";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import type { FolderType } from "../services/graphApi";
import type { EmailMessage } from "../types";
import { formatTime } from "../utils/formatTime";
import { EmailSkeleton } from "./EmailSkeleton";
import { ListFallback } from "./ListFallback";

interface EmailListProps {
  selectedFolder: string;
  onSelectEmail: (emailId: EmailMessage) => void;
  selectedEmail: EmailMessage | null;
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
  selectedEmail,
}: EmailListProps) => {
  const {
    emails,
    loading,
    loadingMore,
    error,
    hasNextPage,
    loadMore,
    refetch,
    updateEmailOptimistically,
    revertEmailUpdate,
  } = useEmails(selectedFolder as FolderType, 20);
  const { toggleRead } = useToogleRead({
    updateEmailOptimistically,
    revertEmailUpdate,
  });

  const [sentinelRef, { rootRef }] = useInfiniteScroll({
    loading: loadingMore,
    hasNextPage,
    onLoadMore: loadMore,
  });

  const handleEmailClick = async (email: EmailMessage) => {
    onSelectEmail?.(email);
    if (!email.isRead) {
      toggleRead(email.id, !email.isRead, email);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto border-r border-gray-200"
      ref={rootRef}
    >
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm flex items-center gap-1">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {selectedFolder}
        </h2>
        {emails.length > 0 && (
          <span className="text-sm text-gray-500">({emails.length})</span>
        )}
      </div>
      {loading && <EmailSkeleton count={8} />}
      {error && <ListFallback refetch={refetch} />}
      {!loading && !error && (
        <div>
          <div className="divide-y divide-gray-200 min-h-screen">
            {emails.map((email: EmailMessage) => {
              const isSelected =
                selectedEmail?.conversationId === email?.conversationId;
              const isRead = email.isRead;
              const timeFormatted = formatTime(email.receivedDateTime);

              return (
                <div
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={`
                relative p-4  cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-200/20"
                    : " bg-gray-50/50 hover:bg-gray-50"
                }
              `}
                >
                  {!isRead && (
                    <div className="absolute left-0 top-0 transform  w-1 h-full bg-blue-600 rounded-r"></div>
                  )}

                  <div className="flex items-start space-x-3 ml-2">
                    <div className="flex-shrink-0 w-6 h-6">
                      {isRead ? (
                        <img src="/icons/open-mail.svg" alt="Read" />
                      ) : (
                        <img src="/icons/close-mail.svg" alt="Unread" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <p
                            className={`
                        text-sm truncate
                        ${
                          isRead
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

                      <p
                        className={`
                    text-sm truncate mb-1
                    ${
                      isRead
                        ? "font-semibold text-gray-900"
                        : "font-normal text-gray-800"
                    }
                  `}
                      >
                        {email.subject || "(No Subject)"}
                      </p>

                      <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">
                        {email.bodyPreview || "No preview available"}
                      </p>

                      <div className="flex items-center space-x-3">
                        {email.hasAttachments && (
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-500">📎</span>
                            <span className="text-xs text-gray-500">
                              Attachment
                            </span>
                          </div>
                        )}

                        {email.flag?.flagStatus === "flagged" && (
                          <div className="flex items-center space-x-1">
                            <span className="text-red-500">🚩</span>
                            <span className="text-xs text-red-500">
                              Flagged
                            </span>
                          </div>
                        )}

                        {email.flag?.flagStatus === "complete" && (
                          <div className="flex items-center space-x-1">
                            <span className="text-green-500">✅</span>
                            <span className="text-xs text-green-500">
                              Complete
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasNextPage && (
            <div
              ref={sentinelRef}
              className="h-20 flex items-center justify-center"
            >
              {loadingMore && (
                <div className="text-sm text-gray-500">
                  Loading more emails...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
