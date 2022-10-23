// BASE URLS
const BaseURLs = {
  APP: process.env.NEXT_PUBLIC_APP_BASE_URL,
  API: process.env.NEXT_PUBLIC_EXTERNAL_API_URL
} as const;


/*********** ADMIN REGION START **************/

// USER KEYS
export const AdminUserKeys = {
  GET_USER_DETAILS: `${ BaseURLs.API }/admin/users/`
} as const;

/*********** ADMIN REGION END **************/



/*********** CLIENT REGION START **************/

// USER KEYS
export const UserKeys = {
  GET_CURRENT_USER_PROFILE: `${ BaseURLs.API }/users/profile`,
  GET_BOOKMARKS: `${ BaseURLs.API }/users/profile/bookmarks`
} as const;

/*********** CLIENT REGION START **************/