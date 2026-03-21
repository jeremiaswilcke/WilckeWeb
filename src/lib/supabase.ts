/* ==========================================================================
   WilckeWeb — Supabase Client (lazy-initialisiert)
   ========================================================================== */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

// Client für API-Routes (anon key, RLS-geschützt)
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase-Umgebungsvariablen fehlen (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Server-Client mit Service-Role-Key (für Admin-Zugriff, bypassed RLS)
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase Service-Role-Umgebungsvariablen fehlen");
  }
  return createClient(url, serviceRoleKey);
}
