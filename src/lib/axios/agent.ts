import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { IUserAuth } from "../../models/auth/auth";
import { IChangePassword } from "../../models/users/security";
import { IUserProfile, UserProfileFormValues } from "../../models/users/profile";
import { IUserRegister } from "../../models/auth/register";
import { IPaginated } from "../../models/common/paginated-result";
import { IBookmarkPost } from "../../models/users/bookmark";
import { ICreateUser, IUserEntity } from "../../models/users/admin/user";
import { IClaimEntity } from "../../models/auth/common";
import { ISettingsEntity, SettingsFormValues, SettingsKeyEnum, SettingsServiceEnum } from "../../models/settings/settings";
import { IPostEntity, PostCreateFormValues, PostEditFormValues } from "../../models/posts/admin/post";
import { FileCreateFormValues, FileUpdateFormValues, IFileEntity } from "../../models/files/admin/file";
import { ITaxonomyEntity, ITaxonomySlugsHistoryEntity, TaxonomyCreateFormValues, TaxonomyEditFormValues } from "../../models/taxonomies/admin/taxonomy";

const AxiosApp = axios.create( {
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  withCredentials: true
} );

const AxiosAPI = axios.create( {
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
} );

const responseBody = ( response: AxiosResponse ) => response.data;

// Just for development mode
const sleep = ( ms: number ) => ( response: AxiosResponse ) =>
  new Promise<AxiosResponse>( ( resolve ) =>
    setTimeout( () => resolve( response ), ms )
  );

// Generate Authorization header
const authHeader = ( session: Session | null ) => {
  if ( session?.user.accessToken ) {
    return { Authorization: `Bearer ${ session.user.accessToken }` };
  }
  return undefined;
};

// Axios Interceptor for Refreshing Access Token
createAuthRefreshInterceptor( AxiosAPI, failedRequest =>
  getSession().then( session => {
    const bearer = `Bearer ${ session?.user.accessToken }`;
    AxiosAPI.defaults.headers.common[ 'Authorization' ] = bearer;
    failedRequest.response.config.headers[ 'Authorization' ] = bearer;
    return Promise.resolve();
  } )
);

// Axios App requests
const appRequests = {
  get: ( url: string, config?: AxiosRequestConfig<{}> ) => AxiosApp.get( url, config ).then( sleep( 1000 ) ).then( responseBody ),
  post: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp.post( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  patch: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp.put( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  del: ( url: string, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp
      .delete( url, config )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Axios API requests
const apiRequests = {
  get: ( url: string, config?: AxiosRequestConfig<{}> ) => AxiosAPI.get( url, config ).then( sleep( 1000 ) ).then( responseBody ),
  post: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI.post( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  patch: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI.patch( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  del: ( url: string, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI
      .delete( url, config )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

/*********** ADMIN REGION START **************/

// Settings Agent
export const AdminSettingsAgent = {
  settingsList: ( session: Session | null, settingsService: SettingsServiceEnum ): Promise<ISettingsEntity[]> => apiRequests.get( `/admin/settings?settingService=${ settingsService }`, { headers: authHeader( session ) } ),
  settingDetails: ( session: Session | null, key: SettingsKeyEnum ): Promise<ISettingsEntity> => apiRequests.get( `/admin/settings/${ key }`, { headers: authHeader( session ) } ),
  upsertSettings: ( session: Session | null, settingsArray: SettingsFormValues[] ): Promise<ISettingsEntity[]> => apiRequests.patch( '/admin/settings/upsert', settingsArray, { headers: authHeader( session ) } ),
  deleteSetting: ( session: Session | null, settingsKey: SettingsKeyEnum ): Promise<ISettingsEntity> => apiRequests.del( `/admin/settings/permanent-delete/${ settingsKey }`, { headers: authHeader( session ) } )
};

// User Agent
export const AdminUserAgent = {
  createUser: ( userInfo: ICreateUser ): Promise<IUserAuth> => apiRequests.post( '/users/register-by-email', userInfo ),
  list: ( session: Session | null, path: string ): Promise<IPaginated<IUserEntity>> => apiRequests.get( path, { headers: authHeader( session ) } ),
  details: ( session: Session | null, userId: string ): Promise<IUserEntity> => apiRequests.get( `/admin/users/${ userId }`, { headers: authHeader( session ) } ),
  uploadAvatar: ( session: Session | null, userId: string, formData: FormData ): Promise<IUserEntity> => apiRequests.patch( `/admin/users/edit-avatar/${ userId }`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...authHeader( session ) }
  } ),
  deleteAvatar: ( userId: string, session: Session | null ): Promise<IUserEntity> => apiRequests.del( `/admin/users/delete-avatar/${ userId }`, { headers: authHeader( session ) } ),
  updateUser: ( userId: string, userFormValues: Partial<IUserEntity>, session: Session | null ): Promise<IUserEntity> =>
    apiRequests.patch( `/admin/users/${ userId }`, userFormValues, { headers: authHeader( session ) } ),
  softDelete: ( session: Session | null, userId: string ): Promise<IUserEntity> => apiRequests.del( `/admin/users/soft-delete/${ userId }`, { headers: authHeader( session ) } ),
  softDeletedUsersList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<IUserEntity>> => apiRequests.get( `/admin/users/soft-deleted/trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  recoverUser: ( session: Session | null, userId: string ): Promise<IUserEntity> => apiRequests.patch( `/admin/users/recover/${ userId }`, {}, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, userId: string ): Promise<IUserEntity> => apiRequests.del( `/admin/users/permanent-delete/${ userId }`, { headers: authHeader( session ) } ),
  claimsList: ( session: Session | null ): Promise<IClaimEntity[]> => apiRequests.get( '/admin/claims', { headers: authHeader( session ) } ),
  editUserClaims: ( session: Session | null, userId: string, claimIds: string[] ): Promise<IUserEntity> => apiRequests.patch( `/admin/users/update-claims/${ userId }`, { claimIds }, { headers: authHeader( session ) } ),
};

// Taxonomy Agent
export const AdminTaxonomyAgent = {
  create: ( session: Session | null, taxonomy: TaxonomyCreateFormValues ): Promise<ITaxonomyEntity> => apiRequests.post( `/admin/taxonomies`, taxonomy, { headers: authHeader( session ) } ),
  edit: ( session: Session | null, taxonomyId: string, taxonomy: TaxonomyEditFormValues ): Promise<IPostEntity> => apiRequests.patch( `/admin/taxonomies/${ taxonomyId }`, taxonomy, { headers: authHeader( session ) } ),
  categoriesList: ( session: Session | null, qs?: string ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/categories${ qs }`, { headers: authHeader( session ) } ),
  tagsList: ( session: Session | null, qs?: string ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/tags${ qs }`, { headers: authHeader( session ) } ),
  details: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.get( `/admin/taxonomies/${ taxonomyId }`, { headers: authHeader( session ) } ),
  deleteOldSlug: ( session: Session | null, slugId: string ): Promise<ITaxonomySlugsHistoryEntity> => apiRequests.del( `/admin/taxonomies/slug-history/${ slugId }`, { headers: authHeader( session ) } ),
  softDelete: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.del( `/admin/taxonomies/soft-delete/${ taxonomyId }`, { headers: authHeader( session ) } ),
  softDeleteAll: ( session: Session | null, taxonomyIds: string[] ): Promise<ITaxonomyEntity[]> => apiRequests.del( `/admin/taxonomies/soft-delete-all`, { headers: authHeader( session ), data: { ids: taxonomyIds } } ),
  recoverTaxonomy: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.patch( `/admin/taxonomies/recover/${ taxonomyId }`, {}, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.del( `/admin/taxonomies/permanent-delete/${ taxonomyId }`, { headers: authHeader( session ) } ),
  softDeletedCategoriesList: ( session: Session | null, page: number, limit: number, initialSort: string = '' ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/soft-deleted/categories-trash?page=${ page }&limit=${ limit }${ initialSort }`, { headers: authHeader( session ) } ),
  softDeletedTagsList: ( session: Session | null, page: number, limit: number, initialSort: string = '' ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/soft-deleted/tags-trash?page=${ page }&limit=${ limit }${ initialSort }`, { headers: authHeader( session ) } ),
  emptyTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/taxonomies/empty-trash`, { headers: authHeader( session ) } ),
};

// Post Agent
export const AdminPostAgent = {
  create: ( session: Session | null, post: PostCreateFormValues ): Promise<IPostEntity> => apiRequests.post( `/admin/posts`, post, { headers: authHeader( session ) } ),
  edit: ( session: Session | null, postId: string, post: PostEditFormValues ): Promise<IPostEntity> => apiRequests.patch( `/admin/posts/${ postId }`, post, { headers: authHeader( session ) } ),
  list: ( session: Session | null, path: string ): Promise<IPaginated<IPostEntity>> => apiRequests.get( path, { headers: authHeader( session ) } ),
  details: ( session: Session | null, postId: string ): Promise<IPostEntity> => apiRequests.get( `/admin/posts/${ postId }`, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, postId: string ): Promise<IUserEntity> => apiRequests.del( `/admin/posts/permanent-delete/${ postId }`, { headers: authHeader( session ) } ),
};

// File Agent
export const AdminFileAgent = {
  create: ( session: Session | null, file: FileCreateFormValues ): Promise<IFileEntity> => apiRequests.post( `/admin/files`, file, { headers: authHeader( session ) } ),
  edit: ( session: Session | null, fileId: string, file: FileUpdateFormValues ): Promise<IFileEntity> => apiRequests.patch( `/admin/files/${ fileId }`, file, { headers: authHeader( session ) } ),
  list: ( session: Session | null, qs?: string ): Promise<IPaginated<IFileEntity>> => apiRequests.get( `/admin/files${ qs }`, { headers: authHeader( session ) } ),
  details: ( session: Session | null, fileId: string ): Promise<IFileEntity> => apiRequests.get( `/admin/files/${ fileId }`, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, fileId: string ): Promise<IFileEntity> => apiRequests.del( `/admin/files/permanent-remove/${ fileId }`, { headers: authHeader( session ) } ),
  bulkDeletePermanently: ( session: Session | null, fileIds: string[] ): Promise<IFileEntity[]> => apiRequests.del( `/admin/files/bulk-permanent-remove`, { headers: authHeader( session ), data: { ids: [ ...fileIds ] } } ),
};

/*********** ADMIN REGION END **************/



/*********** CLIENT REGION START **************/

// Auth Agent
export const AuthAgent = {
  register: ( userInfo: IUserRegister ): Promise<IUserAuth> => apiRequests.post( '/users/register-by-email', userInfo ),
  verifyEmail: ( email: string, token: number ): Promise<IUserAuth> => apiRequests.post( 'users/activate-email-registration', { email, token } ),
  remainingTime: ( email: string ): Promise<{ remainingTimeInSec: number; }> => apiRequests.post( '/users/email-token-remaining-time', { email } ),
  resendVerificationToken: ( email: string ): Promise<IUserAuth> => apiRequests.post( '/users/resend-verification-email', { email } ),
  resetPasswordRequest: ( email: string ): Promise<{}> => apiRequests.post( '/users/reset-password/by-email/request', { email } ),
  resetPassword: ( email: string, password: string, token: number ): Promise<IUserAuth> =>
    apiRequests.post( '/users/reset-password/by-email', { email, password, token } ),
  resetPasswordRemainingTime: ( email: string ): Promise<{ remainingTimeInSec: number; }> => apiRequests.post( '/users/reset-password-token-time', { email } ),
};

// User Agent
export const UserAgent = {
  getCurrentUserProfile: ( session: Session | null ): Promise<IUserProfile> => apiRequests.get( '/users/profile', { headers: authHeader( session ) } ),
  updateProfile: ( profileFormValues: UserProfileFormValues, session: Session | null ): Promise<IUserProfile> =>
    apiRequests.patch( '/users/profile', profileFormValues, { headers: authHeader( session ) } ),
  uploadAvatar: ( session: Session | null, formData: FormData ): Promise<IUserProfile> => apiRequests.patch( '/users/profile/edit-avatar', formData, {
    headers: { "Content-Type": "multipart/form-data", ...authHeader( session ) }
  } ),
  deleteAvatar: ( session: Session | null ): Promise<IUserProfile> => apiRequests.del( '/users/profile/delete-avatar', { headers: authHeader( session ) } ),
  isUpdateAvatarAllowed: ( session: Session | null ): Promise<boolean> => apiRequests.get( '/users/profile/update-avatar-setting', { headers: authHeader( session ) } ),
  changePassword: ( body: IChangePassword, session: Session | null ): Promise<IUserProfile> => apiRequests.patch( '/users/change-password', body, { headers: authHeader( session ) } ),
  getBookmarks: ( page: number, session: Session | null ): Promise<IPaginated<IBookmarkPost>> => apiRequests.get( `/users/profile/bookmarks?page=${ page }&limit=6`, { headers: authHeader( session ) } ),
};


/*********** CLIENT REGION START **************/