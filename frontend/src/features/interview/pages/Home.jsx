'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    FileText,
    Upload,
    ArrowRight,
    User,
    Sparkles,
    Loader2,
    ListChecks,
} from 'lucide-react'
import { generateReport } from '../services/interview.api'

export default function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState({
        jobDescription: '',
        selfDescription: '',
        resume: null,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!data.jobDescription.trim()) {
            setError('Job description is required.')
            return
        }
        if (!data.resume && !data.selfDescription.trim()) {
            setError('Please upload a resume or provide a self description.')
            return
        }

        const formData = new FormData()
        formData.append('jobDescription', data.jobDescription)
        formData.append('selfDescription', data.selfDescription)
        if (data.resume) formData.append('resume', data.resume)

        setLoading(true)
        try {
            const res = await generateReport(formData)
            navigate(`/interview/${res.interviewReport._id}`)
        } catch (err) {
            setError('Failed to generate report. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-[#090b0f] px-4 text-white">

            {/* Loading overlay */}
            {loading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#090b0f]/90 backdrop-blur-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10">
                        <Sparkles className="h-7 w-7 animate-pulse text-pink-500" />
                    </div>
                    <p className="text-sm font-semibold">Generating your strategy...</p>
                    <p className="text-[11px] text-zinc-500">AI is analyzing your profile. This may take ~30 seconds.</p>
                </div>
            )}

            {/* Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/10 blur-[120px]" />

            {/* ================= MAIN CONTAINER ================= */}
            <div className="relative z-10 w-full max-w-[820px]">

                {/* Header */}
                <div className="mb-4 text-center">

                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] text-zinc-400">
                        <Sparkles className="h-3 w-3 text-pink-500" />
                        AI-Powered Resume Analysis
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight">
                        Create Your Custom{' '}
                        <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                            Interview Plan
                        </span>
                    </h1>

                    <p className="mt-1 text-[11px] text-zinc-500">
                        Let our AI analyze your job requirements and profile.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate('/reports')}
                        className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-pink-400 transition hover:text-pink-300"
                    >
                        <ListChecks className="h-3.5 w-3.5" />
                        View my reports
                    </button>

                </div>

                {/* ================= FORM ================= */}
                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-xl border border-white/10 bg-[#101318] shadow-2xl shadow-black/30"
                >

                    {/* Two Columns */}
                    <div className="grid lg:grid-cols-2">

                        {/* ================= LEFT ================= */}
                        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">

                            {/* Header */}
                            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">

                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-pink-500/10">
                                        <FileText className="h-3.5 w-3.5 text-pink-500" />
                                    </div>

                                    <h2 className="text-xs font-semibold">
                                        Target Job Description
                                    </h2>
                                </div>

                                <span className="text-[8px] text-pink-500">
                                    Required *
                                </span>

                            </div>

                            <Label
                                htmlFor="jobDescription"
                                className="mb-1.5 block text-[10px] text-zinc-500"
                            >
                                Paste job description
                            </Label>

                            <Textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={data.jobDescription}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        jobDescription: e.target.value,
                                    })
                                }
                                placeholder="Paste the job description here..."
                                className="h-[245px] min-h-0 resize-none rounded-lg border-white/10 bg-[#191d25] px-3 py-2.5 text-[10px] leading-5 text-zinc-300 placeholder:text-zinc-600 focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                            />

                            <div className="mt-1 flex justify-end">
                                <span className="text-[8px] text-zinc-700">
                                    {data.jobDescription.length} / 10000
                                </span>
                            </div>

                        </div>

                        {/* ================= RIGHT ================= */}
                        <div className="p-4">

                            {/* Header */}
                            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2.5">

                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-pink-500/10">
                                    <User className="h-3.5 w-3.5 text-pink-500" />
                                </div>

                                <h2 className="text-xs font-semibold">
                                    Your Profile
                                </h2>

                            </div>

                            <div className="space-y-3">

                                {/* Resume */}
                                <div>

                                    <Label
                                        htmlFor="resume"
                                        className="mb-1.5 block text-[10px] text-zinc-500"
                                    >
                                        Upload Resume{' '}
                                        <span className="text-pink-500">
                                            Required *
                                        </span>
                                    </Label>

                                    <label
                                        htmlFor="resume"
                                        className="group flex h-[82px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-[#191d25] text-center transition hover:border-pink-500/50"
                                    >

                                        <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-pink-500/10">
                                            <Upload className="h-3.5 w-3.5 text-pink-500" />
                                        </div>

                                        {data.resume ? (
                                            <>
                                                <p className="max-w-[250px] truncate text-[10px] text-zinc-300">
                                                    {data.resume.name}
                                                </p>

                                                <p className="text-[8px] text-zinc-600">
                                                    Click to change
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[10px] text-zinc-400">
                                                    Click to upload
                                                </p>

                                                <p className="text-[8px] text-zinc-600">
                                                    PDF or DOCX • Max 10MB
                                                </p>
                                            </>
                                        )}

                                        <Input
                                            id="resume"
                                            name="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null

                                                setData({
                                                    ...data,
                                                    resume: file,
                                                })
                                            }}
                                        />

                                    </label>

                                </div>

                                {/* OR */}
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-white/10" />

                                    <span className="text-[8px] uppercase text-zinc-700">
                                        or
                                    </span>

                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                {/* Self Description */}
                                <div>

                                    <Label
                                        htmlFor="selfDescription"
                                        className="mb-1.5 block text-[10px] text-zinc-500"
                                    >
                                        Quick Self-Description{' '}
                                        <span className="text-pink-500">
                                            Required *
                                        </span>
                                    </Label>

                                    <Textarea
                                        id="selfDescription"
                                        name="selfDescription"
                                        value={data.selfDescription}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                selfDescription:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Briefly describe your experience, skills, and years of experience..."
                                        className="h-[72px] min-h-0 resize-none rounded-lg border-white/10 bg-[#191d25] px-3 py-2 text-[10px] leading-5 text-zinc-300 placeholder:text-zinc-600 focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                    />

                                </div>

                                {/* Info */}
                                <div className="flex items-center gap-2 rounded-lg border border-blue-500/10 bg-blue-500/[0.05] px-2.5 py-2">

                                    <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-[8px] text-blue-400">
                                        i
                                    </div>

                                    <p className="text-[8px] text-zinc-600">
                                        Your information is used to generate a
                                        personalized interview strategy.
                                    </p>

                                </div>

                                {/* Error */}
                                {error && (
                                    <p className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-[10px] text-red-400">
                                        {error}
                                    </p>
                                )}

                                {/* Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-9 w-full rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 text-[10px] font-semibold shadow-lg shadow-pink-600/20 hover:from-pink-500 hover:to-fuchsia-500 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                                            Generate Interview Strategy
                                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                        </>
                                    )}
                                </Button>

                            </div>

                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between border-t border-white/10 bg-[#0d1014] px-4 py-2">

                        <p className="text-[8px] text-zinc-700">
                            AI-Powered Strategy Generation • ~30s
                        </p>

                        <div className="hidden gap-3 text-[8px] text-zinc-700 sm:flex">
                            <span>Privacy Policy</span>
                            <span>Terms</span>
                            <span>Help</span>
                        </div>

                    </div>

                </form>

            </div>
        </main>
    )
}