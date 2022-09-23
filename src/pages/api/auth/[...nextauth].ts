import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';
import { IUserAuth } from "../../../models/users/auth";
import * as jwt from 'jsonwebtoken';
import { IJwt } from "../../../components/common/types/jwt";
import { JWT } from "next-auth/jwt";
import { AvatarSourceEnum } from "../../../models/users/common";

async function refreshAccessToken ( token: JWT ): Promise<JWT> {
  try {

    const { data } = await axios.post<IUserAuth>(
      `${ process.env.EXTERNAL_API_BASE_URL }/users/refresh-tokens`,
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
    console.log( "Refresh Token Error" );
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
      async authorize ( credentials, req ) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password
        };

        try {
          const { data: user } = await axios.post<IUserAuth>(
            `${ process.env.EXTERNAL_API_BASE_URL }/users/login-by-email`,
            payload,
            req.headers
          );

          return user;
        } catch ( error ) {
          const err = error as AxiosError;
          throw new Error( err.response?.status && err.response.status === 401 ? 'Unauthorized' : 'Something went wrong' );
        }
      }
    } )
  ],
  secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt ( { token, user, account } ) {
      if ( account && user ) {
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