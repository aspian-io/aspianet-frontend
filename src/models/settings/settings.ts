import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseMinimalEntity } from "../common/base-entities";

export enum SettingsKeyEnum {
  SITE_NAME = "SITE_NAME",
  SITE_DESCRIPTION = "SITE_DESCRIPTION",
  SITE_URL = "SITE_URL",
  SITE_ADMIN_EMAIL = "SITE_ADMIN_EMAIL",
  SITE_SUPPORT_EMAIL = "SITE_SUPPORT_EMAIL",
  SITE_CONTACT_EMAIL = "SITE_CONTACT_EMAIL",
  SITE_EXTRA_EMAILS = "SITE_EXTRA_EMAILS",
  SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT = "SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT",
  SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID = "SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID",

  USERS_LOGIN_BY_EMAIL = "USERS_LOGIN_BY_EMAIL",
  USERS_LOGIN_BY_MOBILE_PHONE = "USERS_LOGIN_BY_MOBILE_PHONE",
  USERS_AVATARS_ENABLE = "USERS_AVATARS_ENABLE",
  USERS_EMAIL_VERIFICATION_SUBJECT = "USERS_EMAIL_VERIFICATION_SUBJECT",
  USERS_EMAIL_VERIFICATION_TEMPLATE_ID = "USERS_EMAIL_VERIFICATION_TEMPLATE_ID",
  USERS_EMAIL_TOKEN_EXP_IN_MINS = "USERS_EMAIL_TOKEN_EXP_IN_MINS",
  USERS_EMAIL_RESET_PASSWORD_SUBJECT = "USERS_EMAIL_RESET_PASSWORD_SUBJECT",
  USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID = "USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID",
  USERS_EMAIL_CHANGE_PASSWORD_SUBJECT = "USERS_EMAIL_CHANGE_PASSWORD_SUBJECT",
  USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID = "USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID",
  USERS_MOBILE_VERIFICATION_SMS_PATTERN_CODE = "USERS_MOBILE_VERIFICATION_SMS_PATTERN_CODE",
  USERS_MOBILE_TOKEN_EXP_IN_MINS = "USERS_MOBILE_TOKEN_EXP_IN_MINS",

  SMS_DEFAULT_ORIGINATOR = "SMS_DEFAULT_ORIGINATOR",

  NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT = "NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT",
  NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS = "NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS",
  NEWSLETTER_SUBSCRIBE_TEMPLATE_ID = "NEWSLETTER_SUBSCRIBE_TEMPLATE_ID",
  NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID = "NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID",
  NEWSLETTER_SENDING_FROM = "NEWSLETTER_SENDING_FROM",
  NEWSLETTER_CAN_SPAM = "NEWSLETTER_CAN_SPAM",
  NEWSLETTER_COPYRIGHT = "NEWSLETTER_COPYRIGHT",
  NEWSLETTER_COMPANY = "NEWSLETTER_COMPANY",
  NEWSLETTER_COMPANY_LOGO_LINK = "NEWSLETTER_COMPANY_LOGO_LINK",
  NEWSLETTER_ADDRESS = "NEWSLETTER_ADDRESS",
  NEWSLETTER_HOMEPAGE = "NEWSLETTER_HOMEPAGE",
  NEWSLETTER_UNSUB_PAGE = "NEWSLETTER_UNSUB_PAGE",
  NEWSLETTER_UNSUB_PAGE_LABEL = "NEWSLETTER_UNSUB_PAGE_LABEL",

  COMMENT_IS_APPROVED = "COMMENT_IS_APPROVED",
  COMMENT_FORBIDDEN_EXPRESSIONS = "COMMENT_FORBIDDEN_EXPRESSIONS",
  COMMENT_FORBIDDEN_SUSPEND = "COMMENT_FORBIDDEN_SUSPEND",
  COMMENT_MAX_LENGTH = "COMMENT_MAX_LENGTH",

  FILE_WATERMARK_ACTIVE = "FILE_WATERMARK_ACTIVE",
  FILE_WATERMARK_IMAGE_ID = "FILE_WATERMARK_IMAGE_ID",
  FILE_WATERMARK_TO_IMAGE_DIMENSIONS = "FILE_WATERMARK_TO_IMAGE_DIMENSIONS",
  FILE_WATERMARK_PLACEMENT = "FILE_WATERMARK_PLACEMENT",
  FILE_WATERMARK_MARGINS_TOP = "FILE_WATERMARK_MARGINS_TOP",
  FILE_WATERMARK_MARGINS_RIGHT = "FILE_WATERMARK_MARGINS_RIGHT",
  FILE_WATERMARK_MARGINS_BOTTOM = "FILE_WATERMARK_MARGINS_BOTTOM",
  FILE_WATERMARK_MARGINS_LEFT = "FILE_WATERMARK_MARGINS_LEFT",
  FILE_WATERMARK_OPACITY = "FILE_WATERMARK_OPACITY",
  FILE_WATERMARK_SIZES = "FILE_WATERMARK_SIZES",

  MENU_PRIMARY = "MENU_PRIMARY",
  MENU_SECONDARY = "MENU_SECONDARY",
}

export enum SettingsServiceEnum {
  FILES = "FILES",
  USERS = "USERS",
  COMMENTS = "COMMENTS",
  SMS = "SMS",
  NEWSLETTER = "NEWSLETTER",
  MENU = "MENU",
  GENERAL = "GENERAL"
}

export interface ISettingsEntity extends IBaseMinimalEntity {
  key: SettingsKeyEnum;
  value?: string;
  service: SettingsServiceEnum;
}

export interface ISettingsFormValues {
  key: SettingsKeyEnum;
  value?: string;
  service: SettingsServiceEnum;
}

export class SettingsFormValues implements Partial<ISettingsFormValues> {
  @Expose() key?: SettingsKeyEnum = undefined;
  @Expose() value?: string | undefined = undefined;
  @Expose() service?: SettingsServiceEnum = undefined;

  constructor ( init?: ISettingsFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}