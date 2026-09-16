import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, FileText, Target, ChevronLeft, ChevronRight, CalendarDays, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllReports } from '../services/interview.api'

export default function Reports() {
    const navigate = useNavigate()
    const [reports, setReports] = useState([])
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
    const [loading, setLoading] = useState(true)

    const fetchReports = async (page) => {
        setLoading(true)
        try {
            const data = await getAllReports(page, 10)
            setReports(data.reports)
            setPagination(data.pagination)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReports(1)
    }, [])

    return (
        <main className="min-h-screen w-full bg-[#090b0f] text-white">

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090b0f]/95 backdrop-blur-xl">
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                            <Sparkles className="h-4 w-4 text-pink-500" />
                        </div>
                        <h1 className="text-sm font-bold">
                            Interview<span className="text-pink-500">AI</span>
                        </h1>
                    </div>
                    <Button
                        onClick={() => navigate('/')}
                        className="h-8 rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 text-xs hover:from-pink-500 hover:to-fuchsia-500"
                    >
                        <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                        New Report
                    </Button>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">

                {/* Title */}
                <div className="mb-5">
                    <h2 className="text-xl font-bold tracking-tight">
                        Your{' '}
                        <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                            Interview Reports
                        </span>
                    </h2>
                    <p className="mt-1 text-xs text-zinc-500">
                        {pagination.total} report{pagination.total !== 1 ? 's' : ''} generated
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-36 animate-pulse rounded-xl border border-white/10 bg-[#101318]" />
                        ))}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
                            <FileText className="h-6 w-6 text-pink-500" />
                        </div>
                        <h3 className="text-sm font-semibold">No reports yet</h3>
                        <p className="mt-1 text-xs text-zinc-500">Generate your first interview strategy to get started.</p>
                        <Button
                            onClick={() => navigate('/')}
                            className="mt-4 h-8 rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 text-xs"
                        >
                            Generate Report
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#101318] p-4 transition hover:border-pink-500/30"
                            >
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                                            <FileText className="h-4 w-4 text-pink-400" />
                                        </div>
                                        <div className="flex items-center gap-1 rounded-full border border-emerald-500/10 bg-emerald-500/[0.06] px-2 py-0.5">
                                            <Target className="h-3 w-3 text-emerald-400" />
                                            <span className="text-[10px] text-emerald-400">{report.matchScore}% match</span>
                                        </div>
                                    </div>
                                    <p className="line-clamp-3 text-[11px] leading-5 text-zinc-400">
                                        {report.jobDescription}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[9px] text-zinc-600">
                                        <CalendarDays className="h-3 w-3" />
                                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </div>
                                    <button
                                        onClick={() => navigate(`/interview/${report._id}`)}
                                        className="flex items-center gap-1 text-[10px] text-pink-400 transition hover:text-pink-300"
                                    >
                                        View <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            disabled={pagination.page === 1}
                            onClick={() => fetchReports(pagination.page - 1)}
                            className="h-8 w-8 rounded-lg border-white/10 bg-white/[0.02] p-0 text-zinc-400 hover:bg-white/[0.05] disabled:opacity-30"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <span className="text-xs text-zinc-500">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <Button
                            variant="outline"
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => fetchReports(pagination.page + 1)}
                            className="h-8 w-8 rounded-lg border-white/10 bg-white/[0.02] p-0 text-zinc-400 hover:bg-white/[0.05] disabled:opacity-30"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

            </div>
        </main>
    )
}
