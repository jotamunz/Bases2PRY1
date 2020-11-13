export interface User {
  _id?: string;
  username?: string;
  name?: string;
  password?: string;
  isAdmin?: boolean;
  accessibleSchemes?: [
    {
      schemeName: string;
    }
  ];
}

export default User;
