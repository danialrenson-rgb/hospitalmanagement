import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const client = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

export type DatabaseConnectionResult =
  | { status: "connected"; message: string }
  | { status: "restricted"; message: string }
  | { status: "schema_missing"; message: string }
  | { status: "disconnected"; message: string }
  | { status: "not_configured"; message: string };

export async function checkDatabaseConnection(): Promise<DatabaseConnectionResult> {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseKey) {
    return {
      status: "not_configured",
      message: "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment environment, then rebuild.",
    };
  }

  let endpoint: string;
  try {
    endpoint = new URL("/rest/v1/patients?select=id&limit=0", supabaseUrl).toString();
  } catch {
    return { status: "disconnected", message: "VITE_SUPABASE_URL is not a valid URL." };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (response.ok) {
      return { status: "connected", message: "Supabase and the patients table are reachable. No patient rows were requested." };
    }

    const body: unknown = await response.json().catch(() => null);
    const code = body && typeof body === "object" && "code" in body && typeof body.code === "string" ? body.code : "";
    const detail = body && typeof body === "object" && "message" in body && typeof body.message === "string" ? body.message : "";

    if (code === "42501" || detail.toLowerCase().includes("permission denied")) {
      return { status: "restricted", message: "Supabase and the database are reachable, but anonymous access is blocked by your security policies." };
    }
    if (code === "PGRST205" || code === "42P01") {
      return { status: "schema_missing", message: "Supabase is reachable, but the patients table is missing. Apply the project's database migration." };
    }
    return {
      status: "disconnected",
      message: detail || `Supabase returned HTTP ${response.status}. Check the project URL and publishable/anon key.`,
    };
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "The database check timed out after 10 seconds."
      : "Could not reach Supabase. Check the URL, network, and deployment environment variables.";
    return { status: "disconnected", message };
  } finally {
    window.clearTimeout(timeout);
  }
}

export function getSupabaseClient() {
  if (!client) {
    throw new Error("Supabase is not configured. Set the required VITE_SUPABASE environment variables.");
  }
  return client;
}
