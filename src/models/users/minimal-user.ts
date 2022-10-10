import { GenderEnum } from "../auth/common";

export interface IMinimalUser {
  email: string;
  gender?: GenderEnum;
  firstName: string;
  lastName: string;
  bio?: string;
}