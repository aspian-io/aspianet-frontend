import { GenderEnum } from "../auth/common";
import { IPost } from "../posts/post";

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
  bookmarkIds: string[];
  projects: IPost[];
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedIn?: string;
  pinterest?: string;
}

export class UserProfileFormValues implements Partial<IUserProfile> {
  firstName: string = '';
  lastName: string = '';
  bio?: string = '';
  birthDate?: Date = undefined;
  gender?: GenderEnum = undefined;
  country?: string = '';
  state?: string = '';
  city?: string = '';
  address?: string = '';
  phone?: string = '';
  mobilePhone?: string = '';
  postalCode?: string = '';
  website?: string = '';
  facebook?: string = '';
  twitter?: string = '';
  instagram?: string = '';
  linkedIn?: string = '';
  pinterest?: string = '';
  github?: string = '';
  stackoverflow?: string = '';

  constructor ( init?: UserProfileFormValues ) {
    if ( init ) {
      Object.keys( this ).forEach( key => {
        // For formik we cannot use null values
        if ( init[ key as keyof typeof init ] ) {
          this[ key as keyof UserProfileFormValues ] = init[ key as keyof typeof init ] as any;
        }
      } );
    }
  }
}
