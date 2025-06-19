import { folders } from "../utils/folders";

interface SidebarProps {
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

export const Sidebar = ({
  selectedFolder,
  setSelectedFolder,
}: SidebarProps) => {
  return (
    <div className="w-20 md:w-1/12 xl:w-2/12 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setSelectedFolder(folder.path)}
              className={`w-full flex flex-col lg:flex-row items-center p-2 gap-2 text-sm font-medium rounded-md transition-colors ${
                selectedFolder === folder.path
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <img src={folder.icon} alt={folder.name} className="w-4 h-4" />
              {folder.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
