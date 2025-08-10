export const API_BASE_URL: string | null = (import.meta as any).env?.VITE_API_BASE_URL || null;
export const HAS_API: boolean = !!API_BASE_URL;

export const SUPABASE_URL: string | null = (import.meta as any).env?.VITE_SUPABASE_URL || null;
export const SUPABASE_KEY: string | null = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || null;
export const HAS_SUPABASE: boolean = !!(SUPABASE_URL && SUPABASE_KEY);