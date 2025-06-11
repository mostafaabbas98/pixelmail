interface SidebarProps {
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

export const Sidebar = ({
  selectedFolder,
  setSelectedFolder,
}: SidebarProps) => {
  return (
    <div className="w-20 md:w-2/12 lg:w-2/12 bg-white border-r border-gray-200 flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          <button
            onClick={() => setSelectedFolder("inbox")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "inbox"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📥 Inbox
          </button>
          <button
            onClick={() => setSelectedFolder("spam")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "spam"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📥 Spam
          </button>
          <button
            onClick={() => setSelectedFolder("sent")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "sent"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📤 Sent
          </button>
          <button
            onClick={() => setSelectedFolder("drafts")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "drafts"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📄 Drafts
          </button>
          <button
            onClick={() => setSelectedFolder("archive")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "archive"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📦 Archive
          </button>
          <button
            onClick={() => setSelectedFolder("trash")}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFolder === "trash"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            🗑️ Trash
          </button>
        </div>
      </nav>
    </div>
  );
};
