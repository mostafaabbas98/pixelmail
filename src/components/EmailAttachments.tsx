import { useAttachments } from "../hooks/useAttachents";
import type { Attachment } from "../types/attachment";

interface AttachmentItemProps {
  attachment: Attachment;
}

const AttachmentItem = ({ attachment }: AttachmentItemProps) => {
  const downloadAttachment = () => {
    if (attachment.contentBytes) {
      try {
        const dataUrl = `data:${attachment.contentType};base64,${attachment.contentBytes}`;
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = attachment.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading attachment:", error);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (contentType: string) => {
    if (contentType.includes("pdf")) return "📄";
    if (contentType.includes("image")) return "🖼️";
    if (contentType.includes("word")) return "📝";
    if (contentType.includes("excel") || contentType.includes("spreadsheet"))
      return "📊";
    if (contentType.includes("zip") || contentType.includes("compressed"))
      return "📦";
    return "📎";
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{getFileIcon(attachment.contentType)}</span>
        <div>
          <div className="font-medium text-sm text-gray-900">
            {attachment.name}
          </div>
          <div className="text-xs text-gray-500">
            {formatFileSize(attachment.size)} • {attachment.contentType}
          </div>
        </div>
      </div>
      <button
        onClick={downloadAttachment}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        disabled={!attachment.contentBytes}
      >
        Download
      </button>
    </div>
  );
};

const EmailAttachments = ({ emailId }: { emailId: string }) => {
  const { attachments, loading, error } = useAttachments(emailId);

  if (loading) {
    return (
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm text-gray-500">Loading attachments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm text-red-600">
          Error loading attachments: {error}
        </div>
      </div>
    );
  }

  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="text-sm font-medium text-gray-700 mb-3">
        Attachments ({attachments.length})
      </div>
      <div className="space-y-2">
        {attachments.map((attachment: Attachment, index: number) => (
          <AttachmentItem
            key={attachment.id || `attachment-${index}`}
            attachment={attachment}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailAttachments;
