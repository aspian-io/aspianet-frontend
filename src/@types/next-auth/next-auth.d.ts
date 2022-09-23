import { IUserAuth } from "../../models/users/auth";
import { AvatarSourceEnum } from "../../models/users/common";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: IUserAuth & {
      accessTokenExpires: number;
      claims: string[];
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    avatarSource: AvatarSourceEnum;
    avatar?: string;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}