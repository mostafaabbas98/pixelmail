import { useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./components/LandingPage";
import { AppHeader } from "./components/AppHeader";
import { EmailApp } from "./components/EmailApp";

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

  if (!isAuthenticated && !isLoading) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen">
      <AppHeader />
      <EmailApp />
    </div>
  );
}

export default App;
