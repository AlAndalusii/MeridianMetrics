"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Mail,
  Phone,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

interface Submission {
  id: number
  session_id: string
  name: string | null
  email: string | null
  company: string | null
  phone: string | null
  score: number | null
  is_complete: boolean
  current_question: number
  created_at: string
  updated_at: string
  completed_at: string | null
}

interface Stats {
  total_submissions: number
  completed_submissions: number
  abandoned_submissions: number
  average_score: number | null
  average_progress: number
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'abandoned'>('all')
  const [error, setError] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const filterParam = filter === 'completed' ? 'isComplete=true' : filter === 'abandoned' ? 'isComplete=false' : ''
      const response = await fetch(`/api/assessment/stats?${filterParam}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions')
      }

      const data = await response.json()
      setSubmissions(data.submissions || [])
      setStats(data.stats || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching submissions:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [filter])

  const exportToCSV = () => {
    if (submissions.length === 0) return

    const headers = ['ID', 'Name', 'Email', 'Company', 'Phone', 'Score', 'Status', 'Progress', 'Created', 'Completed']
    const rows = submissions.map(sub => [
      sub.id,
      sub.name || 'N/A',
      sub.email || 'N/A',
      sub.company || 'N/A',
      sub.phone || 'N/A',
      sub.score || 'N/A',
      sub.is_complete ? 'Completed' : 'Abandoned',
      `${sub.current_question}/19`,
      new Date(sub.created_at).toLocaleDateString(),
      sub.completed_at ? new Date(sub.completed_at).toLocaleDateString() : 'N/A',
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `assessment-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getCompletionRate = () => {
    if (!stats || stats.total_submissions === 0) return 0
    return Math.round((Number(stats.completed_submissions) / Number(stats.total_submissions)) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <MillstoneLogo size="sm" variant="modern" />
            <div className="flex items-center space-x-4">
              <Button
                onClick={fetchSubmissions}
                variant="outline"
                size="sm"
                className="poppins-medium"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="poppins-medium"
                disabled={submissions.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="poppins-bold text-3xl md:text-4xl text-emerald-900 mb-2">
            Assessment Dashboard
          </h1>
          <p className="poppins-regular text-emerald-700">
            Track all assessment submissions and follow up with leads
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-emerald-600" />
                <div className="text-3xl poppins-bold text-emerald-900">
                  {stats.total_submissions}
                </div>
              </div>
              <div className="poppins-medium text-emerald-700 text-sm">Total Submissions</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="text-3xl poppins-bold text-green-900">
                  {stats.completed_submissions}
                </div>
              </div>
              <div className="poppins-medium text-green-700 text-sm">Completed</div>
              <div className="text-xs text-green-600 mt-1">{getCompletionRate()}% completion rate</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-amber-600" />
                <div className="text-3xl poppins-bold text-amber-900">
                  {stats.abandoned_submissions}
                </div>
              </div>
              <div className="poppins-medium text-amber-700 text-sm">Abandoned</div>
              <div className="text-xs text-amber-600 mt-1">Follow-up opportunities</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div className="text-3xl poppins-bold text-blue-900">
                  {stats.average_score ? Math.round(Number(stats.average_score)) : 'N/A'}
                </div>
              </div>
              <div className="poppins-medium text-blue-700 text-sm">Average Score</div>
              <div className="text-xs text-blue-600 mt-1">Completed assessments</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              className="poppins-medium"
            >
              All Submissions
            </Button>
            <Button
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'default' : 'outline'}
              className="poppins-medium"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed Only
            </Button>
            <Button
              onClick={() => setFilter('abandoned')}
              variant={filter === 'abandoned' ? 'default' : 'outline'}
              className="poppins-medium"
            >
              <Clock className="w-4 h-4 mr-2" />
              Abandoned Only
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="poppins-semibold text-red-900 mb-1">Error Loading Data</h3>
                <p className="poppins-regular text-red-700 text-sm">{error}</p>
                <p className="poppins-regular text-red-600 text-xs mt-2">
                  Make sure you've initialized the database by visiting: /api/assessment/init-db
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="poppins-medium text-emerald-700">Loading submissions...</p>
          </div>
        )}

        {/* Submissions List */}
        {!loading && submissions.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-emerald-100 shadow-sm text-center">
            <Users className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="poppins-semibold text-emerald-900 text-xl mb-2">No Submissions Yet</h3>
            <p className="poppins-regular text-emerald-700">
              Assessment submissions will appear here once users start completing the assessment.
            </p>
          </div>
        )}

        {!loading && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      submission.is_complete ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      {submission.is_complete ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="poppins-semibold text-emerald-900 text-lg">
                        {submission.name || 'Anonymous'}
                      </h3>
                      <p className="poppins-regular text-emerald-600 text-sm">
                        {submission.company || 'No company provided'}
                      </p>
                    </div>
                  </div>
                  {submission.score !== null && (
                    <div className="text-right">
                      <div className="poppins-bold text-2xl text-emerald-900">
                        {submission.score}/100
                      </div>
                      <div className="poppins-medium text-xs text-emerald-600">
                        Compliance Score
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {submission.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <a href={`mailto:${submission.email}`} className="poppins-regular text-emerald-700 hover:text-emerald-900">
                        {submission.email}
                      </a>
                    </div>
                  )}
                  {submission.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <a href={`tel:${submission.phone}`} className="poppins-regular text-emerald-700 hover:text-emerald-900">
                        {submission.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="poppins-regular text-emerald-700">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs poppins-semibold ${
                      submission.is_complete
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {submission.is_complete ? 'Completed' : 'Abandoned'}
                    </div>
                    <div className="text-xs poppins-regular text-emerald-600">
                      Progress: {submission.current_question}/19 questions
                    </div>
                  </div>
                  {!submission.is_complete && submission.email && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.location.href = `mailto:${submission.email}?subject=Complete Your PPT Assessment&body=Hi ${submission.name || 'there'},%0D%0A%0D%0AI noticed you started our PPT Compliance Assessment but didn't finish. Would you like help completing it?`}
                      className="poppins-medium"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Follow Up
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

