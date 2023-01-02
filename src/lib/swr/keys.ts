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
  GET_ALL_MENUS: `${ BaseURLs.API }/admin/taxonomies/menus`,
  GET_ALL_MENU_ITEMS: `${ BaseURLs.API }/admin/taxonomies/menu-items`,
  GET_SOFT_DELETED_CATEGORIES: `${ BaseURLs.API }/admin/taxonomies/soft-deleted/categories-trash`,
  GET_SOFT_DELETED_TAGS: `${ BaseURLs.API }/admin/taxonomies/soft-deleted/tags-trash`,
} as const;

// POST KEYS
export const AdminPostKeys = {
  GET_BLOGS_LIST: `${ BaseURLs.API }/admin/posts/blogs`,
  GET_NEWS_LIST: `${ BaseURLs.API }/admin/posts/news`,
  GET_BANNERS_LIST: `${ BaseURLs.API }/admin/posts/banners`,
  GET_PAGES_LIST: `${ BaseURLs.API }/admin/posts/banners`,
  GET_EMAIL_TEMPLATES_LIST: `${ BaseURLs.API }/admin/posts/email-templates`,
  GET_NEWSLETTER_TEMPLATES_LIST: `${ BaseURLs.API }/admin/posts/newsletter-templates`,
  GET_POST_DETAILS: `${ BaseURLs.API }/admin/posts`,
  GET_SOFT_DELETED_BLOGS: `${ BaseURLs.API }/admin/posts/soft-deleted/blogs-trash`,
  GET_SOFT_DELETED_NEWS: `${ BaseURLs.API }/admin/posts/soft-deleted/news-trash`,
  GET_SOFT_DELETED_BANNERS: `${ BaseURLs.API }/admin/posts/soft-deleted/banners-trash`,
  GET_SOFT_DELETED_PAGES: `${ BaseURLs.API }/admin/posts/soft-deleted/pages-trash`,
  GET_SOFT_DELETED_EMAIL_TEMPLATES: `${ BaseURLs.API }/admin/posts/soft-deleted/email-templates-trash`,
  GET_SOFT_DELETED_NEWSLETTER_TEMPLATES: `${ BaseURLs.API }/admin/posts/soft-deleted/newsletter-templates-trash`,
} as const;

// COMMENT KEYS
export const AdminCommentKeys = {
  GET_LIST: `${ BaseURLs.API }/admin/comments`,
  GET_COMMENT_REPLIES: `${ BaseURLs.API }/admin/comments/replies`,
  GET_DETAILS: `${ BaseURLs.API }/admin/comments`,
  GET_SOFT_DELETED_COMMENTS: `${ BaseURLs.API }/admin/comments/soft-deleted/trash`,
} as const;

// FILE KEYS
export const AdminFileKeys = {
  GET_ALL_FILES: `${ BaseURLs.API }/admin/files`,
  GET_FILE_DETAILS: `${ BaseURLs.API }/admin/files`,
} as const;

// EMAIL KEYS
export const AdminEmailKeys = {
  GET_SENT_EMAILS_LIST: `${ BaseURLs.API }/admin/emails/all-sent-emails`,
  GET_SENT_EMAIL_DETAILS: `${ BaseURLs.API }/admin/emails/sent`,
} as const;

// NEWSLETTER KEYS
export const AdminNewsletterKeys = {
  GET_SUBSCRIBERS_LIST: `${ BaseURLs.API }/admin/newsletter/subscribers`,
  GET_SUBSCRIBER_DETAILS: `${ BaseURLs.API }/admin/newsletter/subscribers`,
  GET_SOFT_DELETED_SUBSCRIBERS: `${ BaseURLs.API }/admin/newsletter/subscribers/soft-deleted/subscribers-trash`,

  GET_CAMPAIGNS_LIST: `${ BaseURLs.API }/admin/newsletter/campaigns`,
  GET_CAMPAIGN_DETAILS: `${ BaseURLs.API }/admin/newsletter/campaigns`,
  GET_SOFT_DELETED_CAMPAIGNS: `${ BaseURLs.API }/admin/newsletter/campaigns/soft-deleted/campaigns-trash`,
} as const;

/*********** ADMIN REGION END **************/



/*********** CLIENT REGION START **************/

// USER KEYS
export const UserKeys = {
  GET_CURRENT_USER_PROFILE: `${ BaseURLs.API }/users/profile`,
  GET_BOOKMARKS: `${ BaseURLs.API }/users/profile/bookmarks`
} as const;

/*********** CLIENT REGION START **************/