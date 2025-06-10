import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { GraphApiService } from "../services/graphApi";
import type { UserResponse } from "../types";
import { useEmails } from "../hooks/useEmails";

export const LoginButton = () => {
  const { instance, accounts } = useMsal();
  const { emails, loading, error } = useEmails(10); // Get 10 emails for testing

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    if (accounts.length > 0) {
      instance.clearCache({
        account: accounts[0],
      });
      instance.logoutRedirect({
        authority: "/",
      });
    }
  };

  const graphService = new GraphApiService(instance);

  return (
    <div className="p-4">
      {accounts.length > 0 ? (
        <div>
          <p>Welcome {accounts[0].name}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <button
            onClick={async () => {
              try {
                const profile: UserResponse =
                  await graphService.getUserProfile();
                console.log("User Profile:", profile);
                alert(`Hello ${profile.displayName}!`);
              } catch (error) {
                console.error("Profile fetch failed:", error);
              }
            }}
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          >
            Test Profile API
          </button>
          {loading && (
            <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
              📧 Loading emails...
            </div>
          )}

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
              ❌ Error: {error}
            </div>
          )}

          {emails.length > 0 && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
              ✅ Loaded {emails.length} emails
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Microsoft
        </button>
      )}
    </div>
  );
};
