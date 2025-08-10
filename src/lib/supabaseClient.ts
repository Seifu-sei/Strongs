import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../config';

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;