import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const client = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

export function getSupabaseClient() {
  if (!client) {
    throw new Error("Supabase is not configured. Set the required VITE_SUPABASE environment variables.");
  }
  return client;
}
