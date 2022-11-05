import { plainToClassFromExist, Expose } from "class-transformer";
import { AvatarSourceEnum, GenderEnum, IClaimEntity } from "../../auth/common";
import { IBaseMinimalEntity } from "../../common/base-entities";
import { IPostEntity } from "../../posts/admin/post";

export interface IUserEntity extends IBaseMinimalEntity {
  isActivated: boolean;
  email: string;
  emailVerified: boolean;
  emailVerificationToken: number | null;
  emailVerificationTokenExpiresAt?: Date;
  firstName: string;
  lastName: string;
  bio: string | null;
  role: string | null;
  birthDate: Date | null;
  gender: GenderEnum | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  mobilePhone: string | null;
  mobilePhoneTemp: string | null;
  mobilePhoneVerificationToken: number | null;
  mobilePhoneVerificationTokenExpiresAt: Date;
  mobilePhoneVerified: boolean;
  postalCode: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedIn: string | null;
  pinterest: string | null;
  suspend: Date | null;
  avatar: string | null;
  avatarSource: AvatarSourceEnum;
  claims: IClaimEntity[];
  bookmarks: IPostEntity[];
  bookmarkIds: string[];
}

export class AdminUserPersonalInfo implements Partial<IUserEntity> {
  @Expose() firstName: string = '';
  @Expose() lastName: string = '';
  @Expose() bio: string | null = '';
  @Expose() birthDate?: Date = undefined;
  @Expose() gender?: GenderEnum = undefined;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}


export class AdminUserContactInfo implements Partial<IUserEntity> {
  @Expose() country?: string = undefined;
  @Expose() state?: string = undefined;
  @Expose() city?: string = undefined;
  @Expose() address?: string = undefined;
  @Expose() phone?: string = undefined;
  @Expose() mobilePhone?: string = undefined;
  @Expose() postalCode?: string = undefined;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class AdminUserSocialInfo implements Partial<IUserEntity> {
  @Expose() website?: string = undefined;
  @Expose() facebook?: string = undefined;
  @Expose() twitter?: string = undefined;
  @Expose() instagram?: string = undefined;
  @Expose() linkedIn?: string = undefined;
  @Expose() pinterest?: string = undefined;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}