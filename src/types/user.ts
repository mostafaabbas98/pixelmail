export interface UserProfile {
  id: string;
  name: string;
  email: string;
  givenName?: string;
  surname?: string;
  jobTitle?: string;
  userPrincipalName?: string;
  mail?: string;
  officeLocation?: string;
  department?: string;
  mobilePhone?: string;
  businessPhones?: string[];
  displayName?: string;
  userType?: string;
}
