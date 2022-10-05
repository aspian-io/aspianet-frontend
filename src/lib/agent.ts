import axios, { AxiosRequestHeaders, AxiosResponse, AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import { IUserAuth } from "../models/users/auth";
import { IUserProfile } from "../models/users/profile";
import { IUserRegister } from "../models/users/register";

const AxiosApp = async () => axios.create( {
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  withCredentials: true
} );

const AxiosAPI = async () => axios.create( {
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
} );

const responseBody = ( response: AxiosResponse ) => response.data;

// Just for development mode
const sleep = ( ms: number ) => ( response: AxiosResponse ) =>
  new Promise<AxiosResponse>( ( resolve ) =>
    setTimeout( () => resolve( response ), ms )
  );

// Generate Authorization header
const authHeader = ( session: Session | null ): AxiosRequestHeaders | undefined => {
  if ( session?.user.accessToken ) {
    return { Authorization: `Bearer ${ session.user.accessToken }` };
  }
  return undefined;
};

// Axios App requests
const appRequests = {
  get: async ( url: string, config?: AxiosRequestConfig<{}> ) => ( await AxiosApp() ).get( url, config ).then( sleep( 1000 ) ).then( responseBody ),
  post: async ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosApp() ).post( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  patch: async ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosApp() ).put( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  del: async ( url: string, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosApp() )
      .delete( url, config )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Axios API requests
const apiRequests = {
  get: async ( url: string, config?: AxiosRequestConfig<{}> ) => ( await AxiosAPI() ).get( url, config ).then( sleep( 1000 ) ).then( responseBody ),
  post: async ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosAPI() ).post( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  patch: async ( url: string, body: {}, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosAPI() ).patch( url, body, config ).then( sleep( 1000 ) ).then( responseBody ),
  del: async ( url: string, config?: AxiosRequestConfig<{}> ) =>
    ( await AxiosAPI() )
      .delete( url, config )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Auth agent
export const AuthAgent = {
  register: async ( userInfo: IUserRegister ): Promise<IUserAuth> => await apiRequests.post( '/users/register-by-email', userInfo ),
  verifyEmail: async ( email: string, token: number ): Promise<IUserAuth> => await apiRequests.post( 'users/activate-email-registration', { email, token } ),
  remainingTime: async ( email: string ): Promise<{ remainingTimeInSec: number; }> => await apiRequests.post( '/users/email-token-remaining-time', { email } ),
  resendVerificationToken: async ( email: string ): Promise<IUserAuth> => await apiRequests.post( '/users/resend-verification-email', { email } ),
  resetPasswordRequest: async ( email: string ): Promise<{}> => await apiRequests.post( '/users/reset-password/by-email/request', { email } ),
  resetPassword: async ( email: string, password: string, token: number ): Promise<IUserAuth> =>
    await apiRequests.post( '/users/reset-password/by-email', { email, password, token } ),
  resetPasswordRemainingTime: async ( email: string ): Promise<{ remainingTimeInSec: number; }> => await apiRequests.post( '/users/reset-password-token-time', { email } ),
};

// User agent
export const UserAgent = {
  getCurrentUserProfile: async ( session: Session | null ): Promise<IUserProfile> => await apiRequests.get( '/users/profile', { headers: authHeader( session ) } ),
  uploadAvatar: async ( session: Session | null, formData: FormData ): Promise<IUserProfile> => await apiRequests.patch( 'users/profile/edit-avatar', formData, {
    headers: { "Content-Type": "multipart/form-data", ...authHeader( session ) }
  } ),
  isUpdateAvatarAllowed: async ( session: Session | null ): Promise<boolean> => await apiRequests.get( 'users/profile/update-avatar-setting', { headers: authHeader( session ) } )
};
