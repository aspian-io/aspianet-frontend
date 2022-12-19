import { PostTypeEnum } from "../../models/posts/admin/post";
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

// TAXONOMY KEYS
export const AdminTaxonomyKeys = {
  GET_ALL_CATEGORIES: `${ BaseURLs.API }/admin/taxonomies/categories`,
  GET_SOFT_DELETED_CATEGORIES: `${ BaseURLs.API }/admin/taxonomies/soft-deleted/categories-trash`,
  GET_SOFT_DELETED_TAGS: `${ BaseURLs.API }/admin/taxonomies/soft-deleted/tags-trash`,
} as const;

// POST KEYS
export const AdminPostKeys = {
  GET_BLOGS_LIST: `${ BaseURLs.API }/admin/posts/blogs`,
  GET_BLOGS_QUEUE: `${ BaseURLs.API }/admin/posts/posts-jobs/delayed?type=${ PostTypeEnum.BLOG }`,
  GET_NEWS_LIST: `${ BaseURLs.API }/admin/posts/news`,
  GET_NEWS_QUEUE: `{ BaseURLs.API }/admin/posts/posts-jobs/delayed?type=${ PostTypeEnum.NEWS }`,
  GET_BANNERS_LIST: `${ BaseURLs.API }/admin/posts/banners`,
  GET_BANNERS_QUEUE: `${ BaseURLs.API }/admin/posts/posts-jobs/delayed?type=${ PostTypeEnum.BANNER }`,
  GET_POST_DETAILS: `${ BaseURLs.API }/admin/posts`,
  GET_SOFT_DELETED_BLOGS: `${ BaseURLs.API }/admin/posts/soft-deleted/blogs-trash`,
  GET_SOFT_DELETED_NEWS: `${ BaseURLs.API }/admin/posts/soft-deleted/news-trash`,
  GET_SOFT_DELETED_BANNERS: `${ BaseURLs.API }/admin/posts/soft-deleted/banners-trash`,
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