import { folders } from "../utils/folders";

interface TopBarProps {
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

export const TopBar = ({ selectedFolder, setSelectedFolder }: TopBarProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <nav className="flex gap-2 overflow-x-auto px-4 py-2">
        {folders.map((folder) => (
          <button
            key={folder.name}
            onClick={() => setSelectedFolder(folder.path)}
            className={`min-w-20 flex items-center gap-2 p-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedFolder === folder.path
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <img src={folder.icon} alt={folder.name} className="w-4 h-4" />
            <span>{folder.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
