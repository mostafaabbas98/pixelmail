import { useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./components/LandingPage";
import { AppHeader } from "./components/AppHeader";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PixelMail...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900">PixelMail</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Email List */}
          <div className="w-96 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
            </div>
          </div>

          {/* Email View */}
          <div className="flex-1 bg-white">
            <div className="p-4">
              <div className="text-center text-gray-500 mt-32">
                Welcome to PixelMail! 📧
                <br />
                <span className="text-sm">Email list coming soon...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
