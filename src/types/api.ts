// Generic Graph API response wrapper
export interface GraphApiResponse<T> {
  "@odata.context": string;
  "@odata.nextLink"?: string;
  "@odata.count"?: number;
  value: T[];
}

export type EmailListResponse = GraphApiResponse<
  import("./email").EmailMessage
>;

export type AttachmentResponse = GraphApiResponse<
  import("./attachment").Attachment
>;

export interface UserResponse {
  "@odata.context": string;
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
  givenName?: string;
  surname?: string;
  jobTitle?: string;
  officeLocation?: string;
  businessPhones: string[];
  mobilePhone?: string;
}

export interface GraphApiError {
  error: {
    code: string;
    message: string;
    innerError?: {
      code: string;
      message: string;
    };
  };
}
