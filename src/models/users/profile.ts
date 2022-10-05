import { AvatarSourceEnum, GenderEnum } from "./common";

export interface IUserProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  email: string;
  birthDate?: Date;
  gender?: GenderEnum;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
  mobilePhone?: string;
  postalCode?: string;
  avatarSource: AvatarSourceEnum;
  avatar?: string;
  bookmarkIds: string[];
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedIn?: string;
  pinterest?: string;
}