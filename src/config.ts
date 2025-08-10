export const API_BASE_URL: string | null = (import.meta as any).env?.VITE_API_BASE_URL || null;
export const HAS_API: boolean = !!API_BASE_URL;