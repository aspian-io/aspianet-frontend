import axios, { AxiosResponse } from "axios";
import { IUserAuth } from "../models/users/auth";
import { IUserRegister } from "../models/users/register";

const AxiosApp = axios.create( {
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  withCredentials: true
} );

const AxiosAPI = axios.create( {
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  withCredentials: true
} );

const responseBody = ( response: AxiosResponse ) => response.data;

// Just for development mode
const sleep = ( ms: number ) => ( response: AxiosResponse ) =>
  new Promise<AxiosResponse>( ( resolve ) =>
    setTimeout( () => resolve( response ), ms )
  );

// Axios App requests
const appRequests = {
  get: ( url: string ) => AxiosApp.get( url ).then( sleep( 1000 ) ).then( responseBody ),
  post: ( url: string, body: {} ) =>
    AxiosApp.post( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  put: ( url: string, body: {} ) =>
    AxiosApp.put( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  del: ( url: string ) =>
    AxiosApp
      .delete( url )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Axios API requests
const apiRequests = {
  get: ( url: string ) => AxiosAPI.get( url ).then( sleep( 1000 ) ).then( responseBody ),
  post: ( url: string, body: {} ) =>
    AxiosAPI.post( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  put: ( url: string, body: {} ) =>
    AxiosAPI.put( url, body ).then( sleep( 1000 ) ).then( responseBody ),
  del: ( url: string ) =>
    AxiosAPI
      .delete( url )
      .then( sleep( 1000 ) )
      .then( responseBody ),
};

// Auth agent
export const AuthAgent = {
  register: ( userInfo: IUserRegister ): Promise<IUserAuth> => apiRequests.post( '/users/register-by-email', userInfo ),
  verifyEmail: ( email: string, token: number ): Promise<IUserAuth> => apiRequests.post( 'users/activate-email-registration', { email, token } ),
  remainingTime: ( email: string ): Promise<{ remainingTimeInSec: number; }> => apiRequests.post( '/users/email-token-remaining-time', { email } ),
  resendVerificationToken: ( email: string ): Promise<IUserAuth> => apiRequests.post( '/users/resend-verification-email', { email } ),
  resetPasswordRequest: ( email: string ): Promise<IUserAuth> => apiRequests.post( '/users/reset-password/by-email/request', { email } )
};
