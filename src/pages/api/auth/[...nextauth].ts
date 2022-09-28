import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';
import { IUserAuth } from "../../../models/users/auth";
import * as jwt from 'jsonwebtoken';
import { IJwt } from "../../../components/common/types/jwt";
import { JWT } from "next-auth/jwt";
import { AvatarSourceEnum } from "../../../models/users/common";
import GoogleProvider from "next-auth/providers/google";
import { INestError } from "../../../models/common/error";
import { UserErrorsEnum, UserErrorsInternalCodeEnum } from "../../../models/users/auth-error";

async function refreshAccessToken ( token: JWT ): Promise<JWT> {
  try {

    const { data } = await axios.post<IUserAuth>(
      `${ process.env.NEXT_PUBLIC_EXTERNAL_API_URL }/users/refresh-tokens`,
      undefined,
      {
        headers: {
          Cookie: `RT=${ token.refreshToken }`
        }
      }
    );

    const decodedJwt = jwt.decode( data.accessToken ) as IJwt;

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accessTokenExpires: decodedJwt.exp,
    };
  } catch ( error ) {
    return token;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider( {
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize ( credentials ) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password
        };

        try {
          const { data: user } = await axios.post<IUserAuth>(
            `${ process.env.NEXT_PUBLIC_EXTERNAL_API_URL }/users/login-by-email`,
            payload,
          );

          return user;
        } catch ( error ) {
          const err = error as AxiosError<INestError>;
          const statusCode = err.response?.data.statusCode;
          const internalCode = err.response?.data.internalCode;

          if ( err.response?.data.statusCode === 401 ) {
            throw new Error( JSON.stringify( { statusCode: 401, internalCode: 0, message: 'Email or password is incorrect' } ) );
          }
          if ( internalCode && internalCode === UserErrorsInternalCodeEnum.INACTIVE_ACCOUNT ) {
            throw new Error( JSON.stringify( { statusCode, internalCode, message: UserErrorsEnum.INACTIVE_ACCOUNT } ) );
          }
          if ( internalCode && internalCode === UserErrorsInternalCodeEnum.SUSPENDED_ACCOUNT ) {
            throw new Error( JSON.stringify( { statusCode, internalCode, message: UserErrorsEnum.SUSPENDED_ACCOUNT } ) );
          }

          throw new Error( JSON.stringify( { statusCode, internalCode: UserErrorsInternalCodeEnum.BAD_REQUEST, message: UserErrorsEnum.BAD_REQUEST } ) );
        }
      }
    } ),
    GoogleProvider( {
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET!,
    } )
  ],

  secret: process.env.AUTH_ACCESS_TOKEN_SECRET,

  pages: {
    signIn: '/auth/login',
    error: '/auth/nextauth-error'
  },

  callbacks: {
    async redirect ( { url, baseUrl } ) {
      // Allows relative callback URLs
      if ( url.startsWith( "/" ) ) return `${ baseUrl }${ url }`;
      // Allows callback URLs on the same origin
      else if ( new URL( url ).origin === baseUrl ) return url;
      return baseUrl;
    },
    async jwt ( { token, user, account } ) {
      if ( account && user ) {
        if ( account.provider === 'credentials' ) {
          const decodedJwt = jwt.decode( user.accessToken ) as IJwt;
          account.access_token = user.accessToken;
          account.refresh_token = user.refreshToken;
          account.expires_at = decodedJwt.exp;

          return {
            ...token,
            ...user,
            accessTokenExpires: decodedJwt.exp
          };
        }

        if ( account.provider === 'google' ) {
          const googleAccessTokenExpires = account.expires_at;
          let firstName = 'user';
          let lastName = 'user';
          const email = user.email;
          const avatar = user.image;
          if ( user?.name ) {
            const nameParts = user.name.split( ' ' );
            if ( nameParts.length > 1 ) {
              firstName = nameParts[ 0 ];
              lastName = nameParts[ nameParts.length - 1 ];
            } else {
              firstName = nameParts[ 0 ];
            }
          }

          if ( ( Math.floor( Date.now() / 1000 ) < Number( googleAccessTokenExpires ) ) ) {
            const authServerAccessToken = jwt.sign(
              { sub: account.providerAccountId, email, clms: [] },
              process.env.AUTH_ACCESS_TOKEN_SECRET!,
              { expiresIn: process.env.OAUTH_SERVER_ACCESS_TOKEN_EXPIRATION }
            );

            try {
              const { data: userFromServer } = await axios.post<IUserAuth>(
                `${ process.env.NEXT_PUBLIC_EXTERNAL_API_URL }/users/oauth2-login`,
                { firstName, lastName, username: email, avatar },
                {
                  headers: {
                    Authorization: `Bearer ${ authServerAccessToken }`
                  }
                }
              );

              const decodedJwt = jwt.decode( userFromServer.accessToken ) as IJwt;
              token.accessToken = userFromServer.accessToken;
              token.refreshToken = userFromServer.refreshToken;
              token.email = userFromServer.email;
              token.sub = userFromServer.id;
              token.accessTokenExpires = decodedJwt.exp;

              return {
                ...token,
                ...userFromServer,
              };
            } catch ( error ) {
              const err = error as AxiosError<INestError>;
              const internalCode = err.response?.data.internalCode;
              const statusCode = err.response?.data.statusCode;

              if ( internalCode && internalCode === UserErrorsInternalCodeEnum.SUSPENDED_ACCOUNT ) {
                throw new Error( JSON.stringify( { statusCode, internalCode, message: UserErrorsEnum.SUSPENDED_ACCOUNT } ) );
              }

              throw new Error( JSON.stringify( { statusCode, internalCode: UserErrorsInternalCodeEnum.BAD_REQUEST, message: UserErrorsEnum.BAD_REQUEST } ) );
            }
          }
        }
      }

      if ( ( Math.floor( Date.now() / 1000 ) > Number( token.accessTokenExpires ) ) ) {
        return await refreshAccessToken( token );
      }

      return token;
    },

    async session ( { session, token } ) {
      const decodedJwt = jwt.decode( token.accessToken ) as IJwt;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user.id = decodedJwt.sub;
      session.user.email = decodedJwt.email;
      session.user.firstName = token?.firstName as string;
      session.user.lastName = token?.lastName as string;
      session.user.avatarSource = token?.avatarSource as AvatarSourceEnum;
      session.user.avatar = token?.avatar as string;
      session.user.claims = decodedJwt.clms;

      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  }
};

export default NextAuth( authOptions );