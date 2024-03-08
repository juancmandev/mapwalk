import {
  createServerClient as supabaseServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase/types';

export default function createServerClient() {
  const cookieStore = cookies();

  return supabaseServerClient<Database>(
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
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );
}
