// BASE URLS
const BaseURLs = {
  APP: process.env.NEXT_PUBLIC_APP_BASE_URL,
  API: process.env.NEXT_PUBLIC_EXTERNAL_API_URL
} as const;


// USER KEYS
export const UserKeys = {
  GET_CURRENT_USER_PROFILE: `${ BaseURLs.API }/users/profile`,
  GET_BOOKMARKS: `${ BaseURLs.API }/users/profile/bookmarks`
} as const;