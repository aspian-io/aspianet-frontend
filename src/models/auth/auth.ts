import { AvatarSourceEnum } from "./common";

export interface IUserAuth {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  avatarSource: AvatarSourceEnum;
  avatar?: string;
}
