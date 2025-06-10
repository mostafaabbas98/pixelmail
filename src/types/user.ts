export interface UserProfile {
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