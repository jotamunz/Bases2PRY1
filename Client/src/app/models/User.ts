export interface User {
  _id?: string;
  username?: string;
  name?: string;
  password?: string;
  isAdmin?: boolean;
  accessibleSchemes?: [
    {
      schemeId: string;
    }
  ];
}
