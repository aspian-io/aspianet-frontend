import { GenderEnum } from "../auth/common";

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

  constructor ( init?: UserProfileFormValues ) {
    if ( init ) {
      Object.keys( this ).forEach( key => { this[ key as keyof UserProfileFormValues ] = init[ key as keyof typeof init ] as any; } );
    }
  }
}
