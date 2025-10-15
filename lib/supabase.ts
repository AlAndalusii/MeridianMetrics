import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

