namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_BASE_URL?: string;
    NEXT_PUBLIC_EXTERNAL_API_URL?: string;
    NEXT_PUBLIC_STORAGE_BASE_URL?: string;
    NEXTAUTH_URL?: string;
    AUTH_ACCESS_TOKEN_SECRET?: string;
    OAUTH_SERVER_ACCESS_TOKEN_EXPIRATION?: string;
    OAUTH_GOOGLE_CLIENT_ID?: string;
    OAUTH_GOOGLE_SECRET?: string;
    OAUTH_GOOGLE_CALLBACK_URI?: string;
  }
}