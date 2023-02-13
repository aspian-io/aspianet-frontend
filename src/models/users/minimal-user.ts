import { AvatarSourceEnum, GenderEnum } from "../auth/common";

export interface IMinimalUser {
  id: string;
  email: string;
  gender?: GenderEnum;
  firstName: string;
  lastName: string;
  bio?: string;
  role?: string;
  avatarSource: AvatarSourceEnum;
  avatar?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedIn?: string;
  pinterest?: string;
  github?: string;
  stackoverflow?: string;
}