import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/nextjs';

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * @description The function to create a supabase client.
 * @returns {ReturnType<typeof createSupabaseClient>}
 */
export const createClient = () => {
  const { session } = useSession();

  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage:
          typeof window !== 'undefined'
            ? window.localStorage
            : {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
              },
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: 'supabase',
          });

          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );

  return supabaseInstance;
};
