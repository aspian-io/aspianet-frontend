import { plainToClassFromExist, Expose, Type, Transform } from "class-transformer";
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
  @Expose() @Transform( v => v.value ?? '' ) firstName: string = '';
  @Expose() @Transform( v => v.value ?? '' ) lastName: string = '';
  @Expose() @Transform( v => v.value ?? '' ) bio: string | null = '';
  @Expose() birthDate?: Date = undefined;
  @Expose() @Transform( v => v.value ?? undefined ) gender?: GenderEnum;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}


export class AdminUserContactInfo implements Partial<IUserEntity> {
  @Expose() @Transform( v => v.value ?? undefined ) country?: string;
  @Expose() @Transform( v => v.value ?? undefined ) state?: string;
  @Expose() @Transform( v => v.value ?? undefined ) city?: string;
  @Expose() @Transform( v => v.value ?? undefined ) address?: string;
  @Expose() @Transform( v => v.value ?? undefined ) phone?: string;
  @Expose() @Transform( v => v.value ?? undefined ) mobilePhone?: string;
  @Expose() @Transform( v => v.value ?? undefined ) postalCode?: string;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class AdminUserSocialInfo implements Partial<IUserEntity> {
  @Expose() @Transform( v => v.value ?? undefined ) website?: string;
  @Expose() @Transform( v => v.value ?? undefined ) facebook?: string;
  @Expose() @Transform( v => v.value ?? undefined ) twitter?: string;
  @Expose() @Transform( v => v.value ?? undefined ) instagram?: string;
  @Expose() @Transform( v => v.value ?? undefined ) linkedIn?: string;
  @Expose() @Transform( v => v.value ?? undefined ) pinterest?: string;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}


export class AdminUserDetailsContactInfo implements Partial<IUserEntity> {
  @Expose() @Transform( v => v.value ?? undefined ) country?: string;
  @Expose() @Transform( v => v.value ?? undefined ) state?: string;
  @Expose() @Transform( v => v.value ?? undefined ) city?: string;
  @Expose() @Transform( v => v.value ?? undefined ) address?: string;
  @Expose() @Transform( v => v.value ?? undefined ) email?: string;
  @Expose() @Transform( v => v.value ?? undefined ) phone?: string;
  @Expose() @Transform( v => v.value ?? undefined ) mobilePhone?: string;
  @Expose() @Transform( v => v.value ?? undefined ) postalCode?: string;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class AdminUserDetailsSecurityInfo implements Partial<IUserEntity> {
  @Expose() @Transform( v => v.value ?? '' ) role?: string;
  @Expose() suspend?: Date = undefined;
  @Expose() @Transform( v => v.value ?? undefined ) isActivated?: boolean;
  @Expose() @Transform( v => v.value ?? undefined ) emailVerified?: boolean;
  @Expose() @Transform( v => v.value ?? undefined ) mobilePhoneVerified?: boolean;

  constructor ( init?: IUserEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}