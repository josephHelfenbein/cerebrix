import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * @description The function to create a supabase client.
 * @returns {ReturnType<typeof createSupabaseClient>}
 */
export const createClient = () => {
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
    },
  );

  return supabaseInstance;
};
