import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

let instance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!instance) {
    instance = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return instance;
}

export const supabase = getSupabaseClient();
