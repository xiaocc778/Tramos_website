import { createBrowserClient, createServerClient, parse } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createClient(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function createServerClientEnhanced(
  cookies: {
    getAll: () => { name: string; value: string }[];
    setAll: (cookies: { name: string; value: string; options?: object }[]) => void;
  }
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookies.setAll(cookiesToSet);
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}

export function parseCookies(req: Request) {
  if (!req.headers.get('cookie')) return {};
  return parse(req.headers.get('cookie')!);
}
