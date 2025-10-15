import { supabase } from './supabase'

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

// Save or update assessment submission
export async function saveAssessmentProgress(
  sessionId: string,
  data: {
    name?: string
    email?: string
    company?: string
    phone?: string
    answers: Record<string, any>
    currentQuestion: number
    isComplete?: boolean
    score?: number
  }
) {
  try {
    const { name, email, company, phone, answers, currentQuestion, isComplete, score } = data

    // Check if submission already exists
    const { data: existing } = await supabase
      .from('assessment_submissions')
      .select('id')
      .eq('session_id', sessionId)
      .single()

    const submissionData = {
      session_id: sessionId,
      name: name || null,
      email: email || null,
      company: company || null,
      phone: phone || null,
      answers: answers,
      current_question: currentQuestion,
      is_complete: isComplete || false,
      score: score || null,
      updated_at: new Date().toISOString(),
      completed_at: isComplete ? new Date().toISOString() : null,
    }

    let result

    if (existing) {
      // Update existing submission
      result = await supabase
        .from('assessment_submissions')
        .update(submissionData)
        .eq('session_id', sessionId)
        .select()
        .single()
    } else {
      // Insert new submission
      result = await supabase
        .from('assessment_submissions')
        .insert({
          ...submissionData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
    }

    if (result.error) {
      console.error('Supabase error:', result.error)
      return { success: false, error: result.error }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error('Error saving assessment progress:', error)
    return { success: false, error }
  }
}

// Get submission by session ID
export async function getSubmissionBySessionId(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from('assessment_submissions')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return { success: true, data: null }
      }
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error getting submission:', error)
    return { success: false, error }
  }
}

// Get all submissions (for admin dashboard)
export async function getAllSubmissions(filters?: {
  isComplete?: boolean
  limit?: number
  offset?: number
}) {
  try {
    const { isComplete, limit = 100, offset = 0 } = filters || {}

    let query = supabase
      .from('assessment_submissions')
      .select('id, session_id, name, email, company, phone, score, is_complete, current_question, created_at, updated_at, completed_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (isComplete !== undefined) {
      query = query.eq('is_complete', isComplete)
    }

    const { data, error } = await query

    if (error) {
      return { success: false, error }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error getting submissions:', error)
    return { success: false, error }
  }
}

// Get statistics
export async function getSubmissionStats() {
  try {
    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from('assessment_submissions')
      .select('*', { count: 'exact', head: true })

    if (totalError) {
      return { success: false, error: totalError }
    }

    // Get completed count
    const { count: completedCount, error: completedError } = await supabase
      .from('assessment_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_complete', true)

    if (completedError) {
      return { success: false, error: completedError }
    }

    // Get average score for completed submissions
    const { data: completedSubmissions, error: scoreError } = await supabase
      .from('assessment_submissions')
      .select('score, current_question')
      .eq('is_complete', true)

    if (scoreError) {
      return { success: false, error: scoreError }
    }

    // Get all submissions for average progress
    const { data: allSubmissions, error: progressError } = await supabase
      .from('assessment_submissions')
      .select('current_question')

    if (progressError) {
      return { success: false, error: progressError }
    }

    // Calculate averages
    const averageScore = completedSubmissions && completedSubmissions.length > 0
      ? completedSubmissions.reduce((sum, sub) => sum + (sub.score || 0), 0) / completedSubmissions.length
      : null

    const averageProgress = allSubmissions && allSubmissions.length > 0
      ? allSubmissions.reduce((sum, sub) => sum + (sub.current_question || 0), 0) / allSubmissions.length
      : 0

    return {
      success: true,
      data: {
        total_submissions: totalCount || 0,
        completed_submissions: completedCount || 0,
        abandoned_submissions: (totalCount || 0) - (completedCount || 0),
        average_score: averageScore,
        average_progress: averageProgress,
      },
    }
  } catch (error) {
    console.error('Error getting stats:', error)
    return { success: false, error }
  }
}
