import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  FileText,
  Target,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ArrowRight,
  Search,
  Plus,
  Layers,
  TrendingUp,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getAllReports } from '../services/interview.api'

export default function Reports() {
  const navigate = useNavigate()
  
  const [reports, setReports] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchReports = async (page) => {
    setLoading(true)
    try {
      const data = await getAllReports(page, 10)
      setReports(data.reports || [])
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } catch (err) {
      console.error('Failed to fetch reports:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports(1)
  }, [])

  // Client-side quick filter on current page reports
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports
    return reports.filter((report) =>
      report.jobDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [reports, searchQuery])

  // Helper for Match Score Styling
  const getMatchScoreBadge = (score = 0) => {
    if (score >= 80) {
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    }
    if (score >= 60) {
      return 'border-amber-500/30 bg-amber-500/10 text-amber-400'
    }
    return 'border-rose-500/30 bg-rose-500/10 text-rose-400'
  }

  return (
    <main className="min-h-screen w-full bg-[#07090e] text-white selection:bg-pink-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent blur-3xl" />

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center gap-3 transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
              <Sparkles className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">
                Interview<span className="text-pink-500">AI</span>
              </h1>
              <p className="hidden text-[10px] text-zinc-500 sm:block">
                Candidate Report Hub
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate('/')}
            className="h-9 rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 px-4 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:opacity-95"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Assessment
          </Button>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        
        {/* HEADER TITLE & SEARCH CONTROLS */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-0.5 text-xs font-medium text-pink-400">
              <Layers className="h-3 w-3" />
              Saved Intelligence
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Interview Strategy{' '}
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Reports
              </span>
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              {pagination.total} strategy report{pagination.total !== 1 ? 's' : ''} generated across target job descriptions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-[#0d1017] pl-10 pr-4 text-xs text-white placeholder-zinc-500 backdrop-blur-md outline-none transition focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30"
            />
          </div>
        </div>

        {/* ================= REPORTS GRID / STATES ================= */}
        {loading ? (
          /* Skeleton Loader */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-44 animate-pulse flex-col justify-between rounded-2xl border border-white/5 bg-[#0d1017] p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-8 rounded-lg bg-white/5" />
                    <div className="h-5 w-16 rounded-full bg-white/5" />
                  </div>
                  <div className="h-3 w-3/4 rounded bg-white/5" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="h-3 w-20 rounded bg-white/5" />
                  <div className="h-3 w-12 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredReports.length === 0 ? (
          /* Empty State */
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0d1017]/50 p-12 text-center backdrop-blur-md">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-white">No Reports Found</h3>
            <p className="mt-1 max-w-sm text-xs text-zinc-400">
              {searchQuery
                ? `No strategy reports matched your search term "${searchQuery}".`
                : "You haven't created any interview reports yet. Generate your first personalized strategy plan now."}
            </p>
            <Button
              onClick={() => navigate('/')}
              className="mt-6 h-9 rounded-xl bg-gradient-to-r from-pink-600 to-fuchsia-600 px-5 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 hover:opacity-90"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Generate First Strategy
            </Button>
          </div>
        ) : (
          /* Reports List Grid */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => {
              const matchBadgeClass = getMatchScoreBadge(report.matchScore)

              return (
                <div
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017]/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/5"
                >
                  {/* Hover Accent Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition group-hover:bg-pink-500/20" />

                  <div>
                    {/* Top Meta Bar */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div
                        className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${matchBadgeClass}`}
                      >
                        <Target className="h-3 w-3" />
                        <span>{report.matchScore || 0}% Match</span>
                      </div>
                    </div>

                    {/* Job Description Preview */}
                    <p className="line-clamp-3 text-xs leading-relaxed text-zinc-300 group-hover:text-white transition">
                      {report.jobDescription}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <CalendarDays className="h-3.5 w-3.5 text-zinc-600" />
                      <span>
                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-semibold text-pink-400 transition group-hover:translate-x-1 group-hover:text-pink-300">
                      View Report <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xs text-zinc-500">
              Showing Page <span className="font-bold text-zinc-300">{pagination.page}</span> of{' '}
              <span className="font-bold text-zinc-300">{pagination.totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => fetchReports(pagination.page - 1)}
                className="h-8 rounded-lg border-white/10 bg-white/5 px-3 text-xs text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => fetchReports(pagination.page + 1)}
                className="h-8 rounded-lg border-white/10 bg-white/5 px-3 text-xs text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                Next <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}