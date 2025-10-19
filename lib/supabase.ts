import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, if env vars are not available, create a dummy client
    // This will only be used during static analysis, not actual runtime
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      console.warn('Supabase credentials not found. Using placeholder for build.')
      supabaseInstance = createClient('https://placeholder.supabase.co', 'placeholder-key')
      return supabaseInstance
    }
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

// For backwards compatibility
export const supabase = new Proxy({} as SupabaseClient, {
  get: (_, prop) => {
    const client = getSupabaseClient()
    return client[prop as keyof typeof client]
  }
})

// Type for assessment submission
export interface AssessmentSubmission {
  id: number
  session_id: string
  name: string | null
  email: string | null
  company: string | null
  phone: string | null
  answers: Record<string, any>
  score: number | null
  is_complete: boolean
  current_question: number
  created_at: string
  updated_at: string
  completed_at: string | null
}

