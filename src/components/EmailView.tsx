import dayjs from "dayjs";
import type { EmailMessage } from "../types/email";
import { useMemo } from "react";
import DOMPurify from "dompurify";

export const EmailView = ({
  selectedEmail,
}: {
  selectedEmail: EmailMessage | null;
}) => {
  console.log(selectedEmail);
  const sanitizer = useMemo(() => {
    return DOMPurify.sanitize(selectedEmail?.body?.content || "");
  }, [selectedEmail]);

  return (
    <div className="w-7/12 overflow-y-auto ">
      {!selectedEmail ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">No email selected</div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-300 bg-white flex flex-col gap-1 sticky top-0 shadow-md">
            <div className="text-base font-semibold text-gray-800">
              {selectedEmail?.subject || ""}
            </div>
            <div className="text-xs text-gray-500">
              {selectedEmail?.receivedDateTime
                ? dayjs(selectedEmail.receivedDateTime).format(
                    "MMM D, YYYY h:mm A"
                  )
                : ""}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">From:</span>{" "}
              {selectedEmail?.from?.emailAddress?.name || ""}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">To:</span>{" "}
              {selectedEmail?.toRecipients
                ?.map((t) => t.emailAddress?.name || t.emailAddress?.address)
                .join(", ") || ""}
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: sanitizer,
            }}
          />
        </>
      )}
    </div>
  );
};
