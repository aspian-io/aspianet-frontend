import { IUserAuth } from "../../models/users/auth";
import { AvatarSourceEnum } from "../../models/users/common";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      accessToken: string;
      refreshToken: string;
      avatarSource: AvatarSourceEnum;
      avatar?: string;
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

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}