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
import { IPostEntity, PostFormValues, PostTypeEnum, WidgetTypeEnum } from "../../models/posts/admin/post";
import { FileCreateFormValues, FileUpdateFormValues, IFileEntity } from "../../models/files/admin/file";
import { ITaxonomyEntity, ITaxonomySlugsHistoryEntity, TaxonomyCreateFormValues, TaxonomyEditFormValues } from "../../models/taxonomies/admin/taxonomy";
import { CommentCreateFormValues, CommentEditFormValues, ICommentEntity } from "../../models/comments/admin/comment";
import { AdminSubscriberCreateFormValues, AdminSubscriberUpdateFormValues, ISubscriberEntity } from "../../models/newsletter/subscribers/admin/subscriber";
import { ICampaignEntity, NewsletterCampaignCreateFormValues, NewsletterCampaignUpdateFormValues } from "../../models/newsletter/admin/campaign";
import { EmailSendFormValues, IEmailEntity } from "../../models/emails/email";
import { ITaxonomy } from "../../models/taxonomies/taxonomy";
import { IFileSiteLogo } from "../../models/files/logo-file";
import { IMiniBanner, IMiniPost, IPost, IPostStat } from "../../models/posts/post";
import { CommentFormValues, IComment } from "../../models/comments/comment";
import { ILayout } from "../../models/common/layout";
import { IMinimalUser } from "../../models/users/minimal-user";
import { ISubscriberDto, SubscriberCreateFormValues, SubscriptionTokenDto, UnsubscribeReqDto } from "../../models/newsletter/subscribers/subscriber-dto";
import { IDashboardPostsStatsDto, IDashboardSystemStats } from "../../models/dashboard/dashboard";

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
  get: ( url: string, config?: AxiosRequestConfig<{}> ) => AxiosApp.get( url, config ).then( responseBody ),
  post: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp.post( url, body, config ).then( responseBody ),
  patch: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp.put( url, body, config ).then( responseBody ),
  del: ( url: string, config?: AxiosRequestConfig<{}> ) =>
    AxiosApp
      .delete( url, config )
      .then( responseBody ),
};

// Axios API requests
const apiRequests = {
  get: ( url: string, config?: AxiosRequestConfig<{}> ) => AxiosAPI.get( url, config ).then( responseBody ),
  post: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI.post( url, body, config ).then( responseBody ),
  patch: ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI.patch( url, body, config ).then( responseBody ),
  del: ( url: string, config?: AxiosRequestConfig<{}> ) =>
    AxiosAPI
      .delete( url, config )
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

// Dashboard Agent
export const AdminDashboardAgent = {
  systemStats: ( session: Session | null ): Promise<IDashboardSystemStats> => apiRequests.get( `/admin/dashboard/system-stats`, { headers: authHeader( session ) } ),
  postsStats: ( session: Session | null ): Promise<IDashboardPostsStatsDto> => apiRequests.get( `/admin/dashboard/posts-stats`, { headers: authHeader( session ) } ),
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
  projectCategoriesList: ( session: Session | null, qs?: string ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/project-categories${ qs }`, { headers: authHeader( session ) } ),
  tagsList: ( session: Session | null, qs?: string ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/tags${ qs }`, { headers: authHeader( session ) } ),
  menusList: ( session: Session | null, qs?: string ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/menus${ qs }`, { headers: authHeader( session ) } ),
  menusItems: ( session: Session | null, menuId: string ): Promise<ITaxonomyEntity[]> => apiRequests.get( `/admin/taxonomies/menu-items/${ menuId }`, { headers: authHeader( session ) } ),
  details: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.get( `/admin/taxonomies/${ taxonomyId }`, { headers: authHeader( session ) } ),
  deleteOldSlug: ( session: Session | null, slugId: string ): Promise<ITaxonomySlugsHistoryEntity> => apiRequests.del( `/admin/taxonomies/slug-history/${ slugId }`, { headers: authHeader( session ) } ),
  softDelete: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.del( `/admin/taxonomies/soft-delete/${ taxonomyId }`, { headers: authHeader( session ) } ),
  softDeleteAll: ( session: Session | null, taxonomyIds: string[] ): Promise<ITaxonomyEntity[]> => apiRequests.del( `/admin/taxonomies/soft-delete-all`, { headers: authHeader( session ), data: { ids: taxonomyIds } } ),
  permanentDeleteAll: ( session: Session | null, taxonomyIds: string[] ): Promise<ITaxonomyEntity[]> => apiRequests.del( `/admin/taxonomies/permanent-delete-all`, { headers: authHeader( session ), data: { ids: taxonomyIds } } ),
  recoverTaxonomy: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.patch( `/admin/taxonomies/recover/${ taxonomyId }`, {}, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, taxonomyId: string ): Promise<ITaxonomyEntity> => apiRequests.del( `/admin/taxonomies/permanent-delete/${ taxonomyId }`, { headers: authHeader( session ) } ),
  softDeletedCategoriesList: ( session: Session | null, page: number, limit: number, initialSort: string = '' ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/soft-deleted/categories-trash?page=${ page }&limit=${ limit }${ initialSort }`, { headers: authHeader( session ) } ),
  softDeletedProjectCategoriesList: ( session: Session | null, page: number, limit: number, initialSort: string = '' ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/soft-deleted/project-categories-trash?page=${ page }&limit=${ limit }${ initialSort }`, { headers: authHeader( session ) } ),
  softDeletedTagsList: ( session: Session | null, page: number, limit: number, initialSort: string = '' ): Promise<IPaginated<ITaxonomyEntity>> => apiRequests.get( `/admin/taxonomies/soft-deleted/tags-trash?page=${ page }&limit=${ limit }${ initialSort }`, { headers: authHeader( session ) } ),
  emptyCategoriesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/taxonomies/empty-categories-trash`, { headers: authHeader( session ) } ),
  emptyProjectCategoriesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/taxonomies/empty-project-categories-trash`, { headers: authHeader( session ) } ),
  emptyTagsTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/taxonomies/empty-tags-trash`, { headers: authHeader( session ) } ),
  emptyMenusTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/taxonomies/empty-menus-trash`, { headers: authHeader( session ) } ),
};

// Post Agent
export const AdminPostAgent = {
  create: ( session: Session | null, post: PostFormValues ): Promise<IPostEntity> => apiRequests.post( `/admin/posts`, post, { headers: authHeader( session ) } ),
  edit: ( session: Session | null, postId: string, post: PostFormValues | IPostEntity ): Promise<IPostEntity> => apiRequests.patch( `/admin/posts/${ postId }`, post, { headers: authHeader( session ) } ),
  revalidateHomePage: ( session: Session | null ): Promise<{ revalidated: boolean; }> => appRequests.post( `/api/revalidations/home/revalidate`, {}, { headers: authHeader( session ) } ),
  revalidatePost: ( session: Session | null, postType: PostTypeEnum, slug: string, prevSlug?: string ): Promise<{ revalidated: boolean; }> => appRequests.post( `/api/revalidations/posts/revalidate`, { postType, slug, prevSlug }, { headers: authHeader( session ) } ),
  revalidateBulkPosts: ( session: Session | null, postType: PostTypeEnum, slugs: string[] ): Promise<{ revalidated: boolean; }> => appRequests.post( `/api/revalidations/posts/bulk-revalidate`, { postType, slugs }, { headers: authHeader( session ) } ),
  getRecentPosts: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/recent${ qs }`, { headers: authHeader( session ) } ),
  getWidgetsByType: ( session: Session | null, type: WidgetTypeEnum ): Promise<IPostEntity[]> => apiRequests.get( `/admin/posts/widgets?type=${ type }`, { headers: authHeader( session ) } ),
  blogsList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/blogs${ qs }`, { headers: authHeader( session ) } ),
  newsList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/news${ qs }`, { headers: authHeader( session ) } ),
  bannersList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/banners${ qs }`, { headers: authHeader( session ) } ),
  projectsList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/projects${ qs }`, { headers: authHeader( session ) } ),
  pagesList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/pages${ qs }`, { headers: authHeader( session ) } ),
  emailTemplatesList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/email-templates${ qs }`, { headers: authHeader( session ) } ),
  newsletterTemplatesList: ( session: Session | null, qs: string ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/newsletter-templates${ qs }`, { headers: authHeader( session ) } ),
  details: ( session: Session | null, postId: string ): Promise<IPostEntity> => apiRequests.get( `/admin/posts/${ postId }`, { headers: authHeader( session ) } ),
  softDelete: ( session: Session | null, postId: string ): Promise<IPostEntity> => apiRequests.del( `/admin/posts/soft-delete/${ postId }`, { headers: authHeader( session ) } ),
  softDeleteAll: ( session: Session | null, postIds: string[] ): Promise<IPostEntity[]> => apiRequests.del( `/admin/posts/soft-delete-all`, { headers: authHeader( session ), data: { ids: postIds } } ),
  softDeletedBlogsList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/blogs-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedBannersList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/banners-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedEmailTemplatesList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/email-templates-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedNewsletterTemplatesList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/newsletter-templates-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedNewsList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/news-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedNewsletterHeadersList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/newsletter-headers-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedNewsletterBodiesList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/newsletter-bodies-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedNewsletterFootersList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/newsletter-footers-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedProjectsList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/projects-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  softDeletedPagesList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<Omit<IPostEntity, 'content'>>> => apiRequests.get( `/admin/posts/soft-deleted/pages-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  recoverPost: ( session: Session | null, postId: string ): Promise<ITaxonomyEntity> => apiRequests.patch( `/admin/posts/recover/${ postId }`, {}, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, postId: string ): Promise<IUserEntity> => apiRequests.del( `/admin/posts/permanent-delete/${ postId }`, { headers: authHeader( session ) } ),
  emptyBlogsTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-blogs-trash`, { headers: authHeader( session ) } ),
  emptyBannersTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-banners-trash`, { headers: authHeader( session ) } ),
  emptyEmailTemplatesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-email-templates-trash`, { headers: authHeader( session ) } ),
  emptyNewsletterTemplatesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-newsletter-templates-trash`, { headers: authHeader( session ) } ),
  emptyNewsTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-news-trash`, { headers: authHeader( session ) } ),
  emptyNewsletterHeadersTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-newsletter-headers-trash`, { headers: authHeader( session ) } ),
  emptyNewsletterBodiesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-newsletter-bodies-trash`, { headers: authHeader( session ) } ),
  emptyNewsletterFootersTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-newsletter-footers-trash`, { headers: authHeader( session ) } ),
  emptyProjectsTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-projects-trash`, { headers: authHeader( session ) } ),
  emptyPagesTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/posts/empty-pages-trash`, { headers: authHeader( session ) } ),
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

// Comment Agent
export const AdminCommentAgent = {
  create: ( session: Session | null, comment: CommentCreateFormValues ): Promise<ICommentEntity> => apiRequests.post( `/admin/comments`, comment, { headers: authHeader( session ) } ),
  edit: ( session: Session | null, commentId: string, comment: CommentEditFormValues ): Promise<ICommentEntity> => apiRequests.patch( `/admin/comments/${ commentId }`, comment, { headers: authHeader( session ) } ),
  approve: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.patch( `/admin/comments/approve/${ commentId }`, {}, { headers: authHeader( session ) } ),
  setUnsetSpecial: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.patch( `/admin/comments/set-unset-special/${ commentId }`, {}, { headers: authHeader( session ) } ),
  reject: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.patch( `/admin/comments/reject/${ commentId }`, {}, { headers: authHeader( session ) } ),
  list: ( session: Session | null, qs?: string ): Promise<IPaginated<ICommentEntity>> => apiRequests.get( `/admin/comments${ qs }`, { headers: authHeader( session ) } ),
  commentUserRepliesByParentId: ( session: Session | null, parentId: string ): Promise<ICommentEntity[]> => apiRequests.get( `/admin/comments/user-replies/${ parentId }`, { headers: authHeader( session ) } ),
  details: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.get( `/admin/comments/${ commentId }`, { headers: authHeader( session ) } ),
  unseenNum: ( session: Session | null ): Promise<{ unseenNum: number; }> => apiRequests.get( `/admin/comments/unseen`, { headers: authHeader( session ) } ),
  softDelete: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.del( `/admin/comments/soft-delete/${ commentId }`, { headers: authHeader( session ) } ),
  softDeleteAll: ( session: Session | null, commentIds: string[] ): Promise<ICommentEntity[]> => apiRequests.del( `/admin/comments/soft-delete-all`, { headers: authHeader( session ), data: { ids: commentIds } } ),
  softDeletedCommentsList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<ICommentEntity>> => apiRequests.get( `/admin/comments/soft-deleted/trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  recover: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.patch( `/admin/comments/recover/${ commentId }`, {}, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, commentId: string ): Promise<ICommentEntity> => apiRequests.del( `/admin/comments/permanent-delete/${ commentId }`, { headers: authHeader( session ) } ),
  emptyTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/comments/empty-trash`, { headers: authHeader( session ) } ),
};

// Email Agent
export const AdminEmailAgent = {
  sendMail: ( session: Session | null, email: EmailSendFormValues ): Promise<any> => apiRequests.post( `/admin/emails/send`, email, { headers: authHeader( session ) } ),
  listSentEmails: ( session: Session | null, qs?: string ): Promise<IPaginated<IEmailEntity>> => apiRequests.get( `/admin/emails/all-sent-emails${ qs }`, { headers: authHeader( session ) } ),
  sentEmailDetails: ( session: Session | null, emailId: string ): Promise<IEmailEntity> => apiRequests.get( `/admin/emails/sent/${ emailId }`, { headers: authHeader( session ) } ),
  deletePermanently: ( session: Session | null, emailId: string ): Promise<IEmailEntity> => apiRequests.del( `/admin/emails/sent/permanent-delete/${ emailId }`, { headers: authHeader( session ) } ),
  permanentDeleteAll: ( session: Session | null, emailId: string[] ): Promise<IEmailEntity[]> => apiRequests.del( `/admin/emails/sent/permanent-delete-all`, { headers: authHeader( session ), data: { ids: emailId } } ),
  uploadImg: ( session: Session | null, formData: FormData ): Promise<IFileEntity> => apiRequests.post( `/admin/emails/templates/upload-img`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...authHeader( session ) }
  } ),
};

// Newsletter Agent
export const AdminNewsletterAgent = {
  createSubscriber: ( session: Session | null, subscriber: AdminSubscriberCreateFormValues ): Promise<ISubscriberEntity> => apiRequests.post( `/admin/newsletter/subscribers/subscribe`, subscriber, { headers: authHeader( session ) } ),
  editSubscriber: ( session: Session | null, subscriberId: string, subscriber: AdminSubscriberUpdateFormValues ): Promise<ISubscriberEntity> => apiRequests.patch( `/admin/newsletter/subscribers/${ subscriberId }`, subscriber, { headers: authHeader( session ) } ),
  subscriberDetails: ( session: Session | null, subscriberId: string ): Promise<ISubscriberEntity> => apiRequests.get( `/admin/newsletter/subscribers/${ subscriberId }`, { headers: authHeader( session ) } ),
  listSubscribers: ( session: Session | null, qs?: string ): Promise<IPaginated<ISubscriberEntity>> => apiRequests.get( `/admin/newsletter/subscribers${ qs }`, { headers: authHeader( session ) } ),
  softDeleteSubscriber: ( session: Session | null, subscriberId: string ): Promise<ISubscriberEntity> => apiRequests.del( `/admin/newsletter/subscribers/soft-delete/${ subscriberId }`, { headers: authHeader( session ) } ),
  softDeleteSubscribersAll: ( session: Session | null, subscriberIds: string[] ): Promise<ISubscriberEntity[]> => apiRequests.del( `/admin/newsletter/subscribers/soft-delete-all`, { headers: authHeader( session ), data: { ids: subscriberIds } } ),
  softDeletedSubscribersList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<ISubscriberEntity>> => apiRequests.get( `/admin/newsletter/subscribers/soft-deleted/subscribers-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  recoverSubscriber: ( session: Session | null, subscriberId: string ): Promise<ISubscriberEntity> => apiRequests.patch( `/admin/newsletter/subscribers/recover/${ subscriberId }`, {}, { headers: authHeader( session ) } ),
  deleteSubscriberPermanently: ( session: Session | null, subscriberId: string ): Promise<ISubscriberEntity> => apiRequests.del( `/admin/newsletter/subscribers/permanent-delete/${ subscriberId }`, { headers: authHeader( session ) } ),
  emptySubscribersTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/newsletter/subscribers/empty-subscribers-trash`, { headers: authHeader( session ) } ),

  createCampaign: ( session: Session | null, campaign: NewsletterCampaignCreateFormValues ): Promise<ICampaignEntity> => apiRequests.post( `/admin/newsletter/campaigns`, campaign, { headers: authHeader( session ) } ),
  editCampaign: ( session: Session | null, campaignId: string, campaign: NewsletterCampaignUpdateFormValues ): Promise<ICampaignEntity> => apiRequests.patch( `/admin/newsletter/campaigns/${ campaignId }`, campaign, { headers: authHeader( session ) } ),
  campaignDetails: ( session: Session | null, campaignId: string ): Promise<ICampaignEntity> => apiRequests.get( `/admin/newsletter/campaigns/${ campaignId }`, { headers: authHeader( session ) } ),
  listCampaigns: ( session: Session | null, qs?: string ): Promise<IPaginated<ICampaignEntity>> => apiRequests.get( `/admin/newsletter/campaigns${ qs }`, { headers: authHeader( session ) } ),
  softDeleteCampaign: ( session: Session | null, campaignId: string ): Promise<ICampaignEntity> => apiRequests.del( `/admin/newsletter/campaigns/soft-delete/${ campaignId }`, { headers: authHeader( session ) } ),
  softDeleteCampaignsAll: ( session: Session | null, campaignIds: string[] ): Promise<ICampaignEntity[]> => apiRequests.del( `/admin/newsletter/campaigns/soft-delete-all`, { headers: authHeader( session ), data: { ids: campaignIds } } ),
  softDeletedCampaignsList: ( session: Session | null, page: number, limit: number ): Promise<IPaginated<ICampaignEntity>> => apiRequests.get( `/admin/newsletter/campaigns/soft-deleted/campaigns-trash?page=${ page }&limit=${ limit }`, { headers: authHeader( session ) } ),
  recoverCampaign: ( session: Session | null, campaignId: string ): Promise<ICampaignEntity> => apiRequests.patch( `/admin/newsletter/campaigns/recover/${ campaignId }`, {}, { headers: authHeader( session ) } ),
  deleteCampaignPermanently: ( session: Session | null, campaignId: string ): Promise<ICampaignEntity> => apiRequests.del( `/admin/newsletter/campaigns/permanent-delete/${ campaignId }`, { headers: authHeader( session ) } ),
  emptyCampaignsTrash: ( session: Session | null ): Promise<void> => apiRequests.del( `/admin/newsletter/campaigns/empty-campaigns-trash`, { headers: authHeader( session ) } ),

  uploadImg: ( session: Session | null, formData: FormData ): Promise<IFileEntity> => apiRequests.post( `/admin/newsletter/templates/upload-img`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...authHeader( session ) }
  } ),
};

/*********** ADMIN REGION END **************/



/*********** CLIENT REGION START **************/

// Common Agent
export const CommonAgent = {
  getLayoutData: (): Promise<ILayout> => apiRequests.get( '/layout-data' ),
  contact: ( from: string, subject: string, html: string, recaptcha: string ): Promise<void> => apiRequests.post( '/contact-us', {
    from, subject, html
  }, { headers: { recaptcha } } )
};

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
  membersList: (): Promise<IMinimalUser[]> => apiRequests.get( '/users/members' )
};

// File Agent
export const FileAgent = {
  getSiteLogos: (): Promise<IFileSiteLogo[]> => apiRequests.get( '/files/get-site-logos' ),
};

// Taxonomy Agent
export const TaxonomyAgent = {
  projectCategories: ( qs: string ): Promise<IPaginated<ITaxonomy>> => apiRequests.get( `taxonomies/project-categories${ qs }` ),
  getPrimaryMenu: (): Promise<ITaxonomy[]> => apiRequests.get( '/taxonomies/menus/primary-menu' ),
  getSecondaryMenu: (): Promise<ITaxonomy[]> => apiRequests.get( '/taxonomies/menus/secondary-menu' ),
};

// Post Agent
export const PostAgent = {
  search: ( qs: string ): Promise<IPaginated<IMiniPost>> => apiRequests.get( `/posts/search${ qs }` ),
  bannersList: (): Promise<IPaginated<IMiniBanner>> => apiRequests.get( `/posts/banners?orderBy.createdAt=DESC&page=1&limit=3` ),
  blogsList: ( qs: string ): Promise<IPaginated<IMiniPost>> => apiRequests.get( `/posts/blogs${ qs }` ),
  blogDetails: ( slug: string ): Promise<AxiosResponse<IPost>> => AxiosAPI.get( `/posts/blogs/${ slug }` ),
  blogStatistics: ( slug: string ): Promise<IPostStat> => apiRequests.get( `/posts/blogs/statistics/${ slug }` ),
  newsList: ( qs: string ): Promise<IPaginated<IMiniPost>> => apiRequests.get( `/posts/news${ qs }` ),
  newsDetails: ( slug: string ): Promise<AxiosResponse<IPost>> => AxiosAPI.get( `/posts/news/${ slug }` ),
  newsStatistics: ( slug: string ): Promise<IPostStat> => apiRequests.get( `/posts/news/statistics/${ slug }` ),
  projectsList: ( qs: string ): Promise<IPaginated<IMiniPost>> => apiRequests.get( `/posts/projects${ qs }` ),
  projectDetails: ( slug: string ): Promise<AxiosResponse<IPost>> => AxiosAPI.get( `/posts/projects/${ slug }` ),
  pageDetails: ( slug: string ): Promise<AxiosResponse<IPost>> => AxiosAPI.get( `/posts/pages/${ slug }` ),
  getWidgetsByType: ( type: WidgetTypeEnum ): Promise<IPost[]> => apiRequests.get( `/posts/widgets?type=${ type }` ),
  like: ( session: Session | null, postId: string ): Promise<IPost> => apiRequests.post( `/posts/like/${ postId }`, {}, { headers: authHeader( session ) } ),
  bookmark: ( session: Session | null, postId: string ): Promise<IPost> => apiRequests.post( `/posts/bookmark/${ postId }`, {}, { headers: authHeader( session ) } ),
};

// Comment Agent
export const CommentAgent = {
  create: ( session: Session | null, formValues: CommentFormValues ): Promise<IComment> => apiRequests.post( `/comments`, { ...formValues }, { headers: authHeader( session ) } ),
  postCommentsList: ( postId: string, page: number, limit: number = 10 ): Promise<IPaginated<IComment>> => apiRequests.get( `/comments/${ postId }?page=${ page }&limit=${ limit }` ),
  commentRepliesByAncestorId: ( ancestorId: string, page: number, limit: number = 10 ): Promise<IPaginated<IComment>> => apiRequests.get( `/comments/replies/${ ancestorId }?page=${ page }&limit=${ limit }` ),
  like: ( session: Session | null, commentId: string ): Promise<IComment> => apiRequests.post( `/comments/${ commentId }/like`, {}, { headers: authHeader( session ) } ),
  dislike: ( session: Session | null, commentId: string ): Promise<IComment> => apiRequests.post( `/comments/${ commentId }/dislike`, {}, { headers: authHeader( session ) } ),
  getProjectsSpecialComments: (): Promise<IComment[]> => apiRequests.get( `/comments/projects-special-comments` ),
};

// Newsletter Agent
export const NewsletterAgent = {
  subscribe: ( subscriber: SubscriberCreateFormValues ): Promise<ISubscriberDto> => apiRequests.post( `/newsletter/subscribers/subscribe`, subscriber ),
  confirmSubscription: ( subscriber: SubscriptionTokenDto ): Promise<ISubscriberDto> => apiRequests.post( `/newsletter/subscribers/approve-subscription`, subscriber ),
  unsubscribeRequest: ( subscriber: UnsubscribeReqDto ): Promise<ISubscriberDto> => apiRequests.post( `/newsletter/subscribers/unsubscribe-request`, subscriber ),
  unsubscribe: ( subscriber: SubscriptionTokenDto ): Promise<ISubscriberDto> => apiRequests.post( `/newsletter/subscribers/unsubscribe`, subscriber ),
  tokenRemainingTime: ( subscriberEmail: string ): Promise<{ remainingTimeInSec: number; }> => apiRequests.post( `/newsletter/subscribers/email-token-remaining-time`, { email: subscriberEmail } ),
}


/*********** CLIENT REGION END **************/