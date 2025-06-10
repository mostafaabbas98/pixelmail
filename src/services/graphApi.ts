import type { IPublicClientApplication } from "@azure/msal-browser";
import type { EmailListResponse, GraphApiError } from "../types";
import type { UserResponse } from "../types";
import { loginRequest } from "../config/authConfig";

export class GraphApiService {
  private msalInstance: IPublicClientApplication;
  private readonly baseUrl = "https://graph.microsoft.com/v1.0";

  constructor(msalInstance: IPublicClientApplication) {
    this.msalInstance = msalInstance;
  }

  private async getAccessToken(): Promise<string> {
    const accounts = this.msalInstance.getAllAccounts();

    if (accounts.length === 0) {
      throw new Error("No authenticated accounts found");
    }

    try {
      const res = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      return res.accessToken;
    } catch (error) {
      console.error("Error acquiring token silently", error);
      const res = await this.msalInstance.acquireTokenPopup(loginRequest);
      return res.accessToken;
    }

  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const accessToken = await this.getAccessToken();
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });

      if (!res.ok) {
        const error: GraphApiError = await res.json();
        throw new Error(`Graph API error: ${error.error.message}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Graph API request failed:', error);
      throw error;
    }
  }

  async getUserProfile(): Promise<UserResponse> {
    return this.makeRequest<UserResponse>("/me");
  }

  async getEmails(top: number = 25) {
    return this.makeRequest<EmailListResponse>(`/me/messages?$top=${top}&$orderby=receivedDateTime desc`);
  }
}