namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_BASE_URL?: string;
    NEXT_PUBLIC_EXTERNAL_API_URL?: string;
    NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL?: string;
    NEXT_PUBLIC_STORAGE_FILE_BASE_URL?: string;
    NEXT_PUBLIC_COMPANION_PATH?: string;
    NEXT_PUBLIC_CATEGORY_CHILD_LEVEL?: string;
    NEXT_PUBLIC_ALLOWED_URL_TO_USE?: string;
    NEXT_PUBLIC_PROJECT_ID?: string;
    NEXTAUTH_URL?: string;
    AUTH_ACCESS_TOKEN_SECRET?: string;
    OAUTH_SERVER_ACCESS_TOKEN_EXPIRATION?: string;
    OAUTH_GOOGLE_CLIENT_ID?: string;
    OAUTH_GOOGLE_SECRET?: string;
    OAUTH_GOOGLE_CALLBACK_URI?: string;
    NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY?: string;
    GOOGLE_RECAPTCHA_SECRET_KEY?: string;
  }
}