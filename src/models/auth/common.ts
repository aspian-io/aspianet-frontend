export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female'
}

export enum AvatarSourceEnum {
  STORAGE = "STORAGE",
  OAUTH2 = "OAUTH2"
}

export interface IClaimEntity {
  id: string;
  name: ClaimsEnum
}

export enum ClaimsEnum {
  ADMIN = 'rw_a',
  USER_READ = 'usr_r',
  USER_CREATE = 'usr_w',
  USER_EDIT = 'usr_w+',
  USER_DELETE = 'usr_d',
  SETTING_READ = 'setting_r',
  SETTING_EDIT = 'setting_w+',
  FILE_READ = 'file_r',
  FILE_CREATE = 'file_w',
  FILE_EDIT = 'file_w+',
  FILE_DELETE = 'file_d',
  TAXONOMY_READ = 'taxonomy_r',
  TAXONOMY_CREATE = 'taxonomy_w',
  TAXONOMY_EDIT = 'taxonomy_w+',
  TAXONOMY_DELETE = 'taxonomy_d',
  POST_READ = 'post_r',
  POST_CREATE = 'post_w',
  POST_EDIT = 'post_w+',
  POST_DELETE = 'post_d',
  COMMENT_READ = 'comment_r',
  COMMENT_CREATE = 'comment_w',
  COMMENT_EDIT = 'comment_w+',
  COMMENT_DELETE = 'comment_d',
  EMAIL_SEND = 'mail_send',
  NEWSLETTER_READ = 'newsletter_r',
  NEWSLETTER_CREATE = 'newsletter_w',
  NEWSLETTER_EDIT = 'newsletter_w+',
  NEWSLETTER_DELETE = 'newsletter_d',
  SMS_READ = 'sms_r',
  SMS_CREATE = 'sms_w'
}