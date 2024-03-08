import { createBrowserClient as supabaseBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/supabase/types';

export function createBrowserClient() {
  return supabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
