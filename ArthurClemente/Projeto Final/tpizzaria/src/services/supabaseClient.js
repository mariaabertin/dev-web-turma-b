import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:3000'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'dev-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
