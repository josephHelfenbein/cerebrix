'use server';

import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * @description The function to create a supabase server client.
 * @returns {ReturnType<typeof createServerClient>}
 */
export const createServer = async () => {
  try {
    const cookieStore = await cookies();

    const client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      },
    );
    return client;
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error [createServer]'}`);
  }
};
