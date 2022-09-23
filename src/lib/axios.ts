import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as cookie from 'cookie';
import * as setCookie from 'set-cookie-parser';
import { IUserAuth } from "../models/users/auth";

const axiosInstance = axios.create( {
  baseURL: process.env.APP_BASE_URL,
  withCredentials: true
} );

// Function that will be called to refresh authorization
const refreshAuthLogic = ( failedRequest: any ) =>
  axiosInstance.post<IUserAuth>( 'api/auth/refresh-tokens', undefined ).then( resp => {
    if ( axiosInstance.defaults.headers.common[ 'set-cookie' ] ) {
      delete axiosInstance.defaults.headers.common[ 'set-cookie' ];
    }
    const { accessToken } = resp.data;

    const bearer = `Bearer ${ accessToken }`;
    axiosInstance.defaults.headers.common[ 'Authorization' ] = bearer;

    const responseCookie = setCookie.parse( resp.headers[ 'set-cookie' ]! )[ 0 ];
    axiosInstance.defaults.headers.common[ 'set-cookie' ] = resp.headers[ 'set-cookie' ] as any;
    axiosInstance.defaults.headers.common[ 'cookie' ] = cookie.serialize(
      responseCookie.name,
      responseCookie.value
    );

    failedRequest.response.config.headers.Authorization = bearer;

    return Promise.resolve();
  } );


// Create axios interceptor
createAuthRefreshInterceptor(
  axiosInstance,
  refreshAuthLogic,
);

export default axiosInstance;