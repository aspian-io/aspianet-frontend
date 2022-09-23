import { AvatarSourceEnum, GenderEnum } from "./common";

export interface IUserProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  email: string;
  emailVerified: boolean;
  birthDate?: Date;
  gender?: GenderEnum;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
  mobilePhone?: string;
  mobilePhoneVerified: boolean;
  postalCode?: string;
  avatarSource: AvatarSourceEnum;
  avatar?: string;
  
}