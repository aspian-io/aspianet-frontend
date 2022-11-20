import { SettingsServiceEnum } from "../../models/settings/settings";

// BASE URLS
const BaseURLs = {
  APP: process.env.NEXT_PUBLIC_APP_BASE_URL,
  API: process.env.NEXT_PUBLIC_EXTERNAL_API_URL
} as const;


/*********** ADMIN REGION START **************/

// SETTINGS KEYS
export const AdminSettingsKeys = {
  GET_ALL_SETTINGS: `${ BaseURLs.API }/admin/settings?settingService=${ SettingsServiceEnum.USERS }`,
  GET_SETTING_DETAILS: `${ BaseURLs.API }/admin/settings`
} as const;

// USER KEYS
export const AdminUserKeys = {
  GET_USER_DETAILS: `${ BaseURLs.API }/admin/users`,
  GET_SOFT_DELETED_USERS: `${ BaseURLs.API }/admin/users/soft-deleted/trash`,
  GET_ALL_CLAIMS: `${ BaseURLs.API }/admin/claims`,
} as const;

// POST KEYS
export const AdminPostKeys = {
  GET_POST_DETAILS: `${ BaseURLs.API }/admin/posts`,
} as const;

// FILE KEYS
export const AdminFileKeys = {
  GET_ALL_FILES: `${ BaseURLs.API }/admin/files`,
  GET_FILE_DETAILS: `${ BaseURLs.API }/admin/files`,
} as const;

/*********** ADMIN REGION END **************/



/*********** CLIENT REGION START **************/

// USER KEYS
export const UserKeys = {
  GET_CURRENT_USER_PROFILE: `${ BaseURLs.API }/users/profile`,
  GET_BOOKMARKS: `${ BaseURLs.API }/users/profile/bookmarks`
} as const;

/*********** CLIENT REGION START **************/