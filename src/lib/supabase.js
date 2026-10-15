import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ddzkdxdqwvlyshgzuacu.supabase.co';

const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7Kg-Ka0jvpa3OGIYz1SayA_-lCfSbQC';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
