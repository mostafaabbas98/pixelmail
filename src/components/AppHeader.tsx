import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const AppHeader = () => {
  const { user, logout, isLoading } = useAuth();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowPopover(false);
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">📧 PixelMail</h1>
      </div>

      <div className="relative">
        {user && (
          <>
            <button
              ref={buttonRef}
              onClick={() => setShowPopover(!showPopover)}
              className="h-9 w-9 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors border-2 border-transparent hover:border-blue-300"
            >
              <span className="text-white text-sm font-medium uppercase">
                {user.displayName?.charAt(0) || user.name?.charAt(0) || "?"}
              </span>
            </button>

            {showPopover && (
              <div
                ref={popoverRef}
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {user.displayName?.charAt(0) ||
                          user.name?.charAt(0) ||
                          "?"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName || user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.mail || user.email}
                      </p>
                      {user.jobTitle && (
                        <p className="text-xs text-gray-400 truncate">
                          {user.jobTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md text-center"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};
