import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  const keys = [
    'SUPABASE_URL',
    'SUPABASE_URL_PUBLIC',
    'VITE_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE',
    'SUPABASE_SERVICE_KEY',
    'SUPABASE_ANON_KEY',
    'VITE_SUPABASE_ANON_KEY'
  ];
  const present = keys.reduce((acc: Record<string,string|boolean>, k) => {
    acc[k] = !!process.env[k];
    return acc;
  }, {});
  return {
    statusCode: 200,
    body: JSON.stringify({ present })
  };
};