import { useAuth } from "../contexts/AuthContext";

export const LandingPage = () => {
  const { login, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-lg w-full space-y-8 p-8">
        <div className="text-center">
          <img
            src="/icons/pixel-mail.svg"
            alt="PixelMail"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PixelMail</h1>
          <p className="text-gray-600 text-lg font-medium">
            A lightweight, fast email client for the modern web
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            ✨ Why PixelMail?
          </h3>
          <ul className="text-md text-gray-600 space-y-1">
            <li>• Lightweight - No 3 GB downloads</li>
            <li>• Fast - Built with modern React</li>
            <li>• Clean - Beautiful, distraction-free UI</li>
            <li>• Secure - OAuth 2.0 with Microsoft</li>
          </ul>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">❌ {error}</p>
            </div>
          )}

          <button
            onClick={login}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in with Microsoft"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Secure authentication powered by Microsoft OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
};
