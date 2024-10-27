enum NodeEnv {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_REFRESH_TOKEN: string;
      VERCEL_GIT_COMMIT_SHA?: string;
    }
  }
}

export {};