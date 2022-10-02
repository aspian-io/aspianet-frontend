import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { IUserAuth } from "../models/users/auth";
import { IUserRegister } from "../models/users/register";

const getAuthTokenHeader = async (): Promise<AxiosRequestHeaders | undefined> => {
  const session = await getSession();
  if ( session?.user.accessToken ) {
    return { Authorization: `Bearer ${ session.user.accessToken }` };
  }
  return undefined;
};

const AxiosApp = async () => axios.create( {
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  withCredentials: true
} );

const AxiosAPI = async () => axios.create( {
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  headers: await getAuthTokenHeader()
} );

const responseBody = ( response: AxiosResponse ) => response.data;

// Just for development mode
const sleep = ( ms: number ) => ( response: AxiosResponse ) =>
  new Promise<AxiosResponse>( ( resolve ) =>
    setTimeout( () => resolve( response ), ms )
  );

// Axios App requests
const appRequests = {
  get: async ( url: string ) => ( await AxiosApp() ).get( url ).then( sleep( 1000 ) ).then( responseBody ),
  post: async ( url: string, body: {} ) =>
    ( await AxiosApp() ).post( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  put: async ( url: string, body: {} ) =>
    ( await AxiosApp() ).put( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  del: async ( url: string ) =>
    ( await AxiosApp() )
      .delete( url )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Axios API requests
const apiRequests = {
  get: async ( url: string ) => ( await AxiosAPI() ).get( url ).then( sleep( 1000 ) ).then( responseBody ),
  post: async ( url: string, body: {} ) =>
    ( await AxiosAPI() ).post( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  put: async ( url: string, body: {} ) =>
    ( await AxiosAPI() ).put( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  del: async ( url: string ) =>
    ( await AxiosAPI() )
      .delete( url )
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

};
