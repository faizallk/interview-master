'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    CircleAlert,
    Code2,
    Lightbulb,
    MessageSquare,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    CalendarDays,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getReport } from '../services/interview.api'

export default function Interview() {
    const { interview } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [openTechnical, setOpenTechnical] = useState(null)
    const [openBehavioral, setOpenBehavioral] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getReport(interview)
                setData(res.interviewReport)
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [interview])

    if (loading) {
        return (
            <main className="flex h-screen w-full items-center justify-center bg-[#090b0f] text-white">
                <div className="text-center">
                    <Sparkles className="mx-auto mb-3 h-8 w-8 animate-pulse text-pink-500" />
                    <p className="text-xs text-zinc-500">Loading your report...</p>
                </div>
            </main>
        )
    }

    if (error || !data) {
        return (
            <main className="flex h-screen w-full items-center justify-center bg-[#090b0f] text-white">
                <div className="text-center">
                    <Sparkles className="mx-auto mb-3 h-8 w-8 text-pink-500" />
                    <h1 className="text-lg font-semibold">Interview report not found</h1>
                    <p className="mt-1 text-xs text-zinc-500">This report doesn't exist or you don't have access.</p>
                    <Button onClick={() => navigate('/reports')} className="mt-4 h-8 rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 text-xs">
                        Back to Reports
                    </Button>
                </div>
            </main>
        )
    }

    return (
        <main className="h-screen w-full overflow-y-auto bg-[#090b0f] text-white">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090b0f]/95 backdrop-blur-xl">

                <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                            <Sparkles className="h-4 w-4 text-pink-500" />
                        </div>

                        <div>
                            <h1 className="text-sm font-bold">
                                Interview
                                <span className="text-pink-500">AI</span>
                            </h1>

                            <p className="hidden text-[9px] text-zinc-600 sm:block">
                                Interview Strategy
                            </p>
                        </div>

                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">

                        <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/[0.06] px-2.5 py-1 sm:flex">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />

                            <span className="text-[9px] text-emerald-400">
                                Strategy Ready
                            </span>
                        </div>

                    </div>

                </div>

            </header>

            {/* ================= CONTENT ================= */}

            <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:py-7">

                {/* ================= HERO ================= */}

                <section className="mb-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-pink-500/10 bg-pink-500/[0.06] px-2.5 py-1 text-[9px] text-pink-400">
                                <Sparkles className="h-3 w-3" />
                                AI Generated Interview Strategy
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Your Interview{' '}
                                <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                                    Preparation Plan
                                </span>
                            </h2>

                            <p className="mt-1.5 text-xs text-zinc-500">
                                Personalized preparation based on your target role
                                and professional profile.
                            </p>

                        </div>

                        <Button
                            variant="outline"
                            className="h-9 w-fit rounded-lg border-white/10 bg-white/[0.02] text-xs text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                            onClick={() => navigate('/reports')}
                        >
                            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                            Back
                        </Button>

                    </div>

                </section>

                {/* ================= TOP STATS ================= */}

                <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

                    {/* Match Score */}
                    <div className="rounded-xl border border-white/10 bg-[#101318] p-4">

                        <div className="flex items-center justify-between">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                                <Target className="h-4 w-4 text-pink-500" />
                            </div>

                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />

                        </div>

                        <p className="mt-3 text-[10px] text-zinc-600">
                            Profile Match
                        </p>

                        <div className="mt-0.5 flex items-end gap-1">
                            <span className="text-2xl font-bold">
                                {data.matchScore}
                            </span>

                            <span className="mb-1 text-xs text-zinc-600">
                                %
                            </span>
                        </div>

                    </div>

                    {/* Technical */}
                    <div className="rounded-xl border border-white/10 bg-[#101318] p-4">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                            <Code2 className="h-4 w-4 text-purple-400" />
                        </div>

                        <p className="mt-3 text-[10px] text-zinc-600">
                            Technical Questions
                        </p>

                        <p className="mt-0.5 text-2xl font-bold">
                            {data.technicalQuestions?.length || 0}
                        </p>

                    </div>

                    {/* Behavioral */}
                    <div className="rounded-xl border border-white/10 bg-[#101318] p-4">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10">
                            <MessageSquare className="h-4 w-4 text-fuchsia-400" />
                        </div>

                        <p className="mt-3 text-[10px] text-zinc-600">
                            Behavioral Questions
                        </p>

                        <p className="mt-0.5 text-2xl font-bold">
                            {data.behavioralQuestions?.length || 0}
                        </p>

                    </div>

                    {/* Skill Gaps */}
                    <div className="rounded-xl border border-white/10 bg-[#101318] p-4">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                            <CircleAlert className="h-4 w-4 text-orange-400" />
                        </div>

                        <p className="mt-3 text-[10px] text-zinc-600">
                            Skill Gaps
                        </p>

                        <p className="mt-0.5 text-2xl font-bold">
                            {data.skillGaps?.length || 0}
                        </p>

                    </div>

                </section>

                {/* ================= MAIN GRID ================= */}

                <div className="grid gap-5 lg:grid-cols-[1fr_320px]">

                    {/* ================= LEFT ================= */}

                    <div className="space-y-5">

                        {/* ========================================= */}
                        {/* TECHNICAL QUESTIONS */}
                        {/* ========================================= */}

                        <section className="rounded-xl border border-white/10 bg-[#101318]">

                            <div className="border-b border-white/10 px-4 py-3.5">

                                <div className="flex items-center gap-2.5">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                                        <Code2 className="h-4 w-4 text-purple-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Technical Questions
                                        </h3>

                                        <p className="text-[9px] text-zinc-600">
                                            Questions tailored to your technical experience
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="divide-y divide-white/5">

                                {data.technicalQuestions?.map((item, index) => {

                                    const isOpen = openTechnical === index

                                    return (
                                        <div key={index}>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenTechnical(
                                                        isOpen ? null : index
                                                    )
                                                }
                                                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.02]"
                                            >

                                                <div className="flex gap-3">

                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-[9px] font-semibold text-zinc-500">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>

                                                    <div>
                                                        <p className="text-xs font-medium leading-5 text-zinc-200">
                                                            {item.question}
                                                        </p>

                                                        {!isOpen && (
                                                            <p className="mt-1.5 text-[9px] text-zinc-600">
                                                                Click to view evaluation focus and expected answer
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>

                                                {isOpen ? (
                                                    <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-zinc-600" />
                                                ) : (
                                                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-zinc-600" />
                                                )}

                                            </button>

                                            {isOpen && (
                                                <div className="grid gap-3 border-t border-white/5 bg-[#0d1014] px-4 py-4 sm:grid-cols-2">

                                                    <div className="rounded-lg border border-blue-500/10 bg-blue-500/[0.04] p-3">

                                                        <div className="mb-1.5 flex items-center gap-1.5">
                                                            <Lightbulb className="h-3.5 w-3.5 text-blue-400" />

                                                            <span className="text-[9px] font-semibold uppercase tracking-wide text-blue-400">
                                                                What Interviewer Evaluates
                                                            </span>
                                                        </div>

                                                        <p className="text-[10px] leading-5 text-zinc-500">
                                                            {item.intention}
                                                        </p>

                                                    </div>

                                                    <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] p-3">

                                                        <div className="mb-1.5 flex items-center gap-1.5">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

                                                            <span className="text-[9px] font-semibold uppercase tracking-wide text-emerald-400">
                                                                Expected Answer
                                                            </span>
                                                        </div>

                                                        <p className="text-[10px] leading-5 text-zinc-500">
                                                            {item.answer}
                                                        </p>

                                                    </div>

                                                </div>
                                            )}

                                        </div>
                                    )
                                })}

                            </div>

                        </section>

                        {/* ========================================= */}
                        {/* BEHAVIORAL QUESTIONS */}
                        {/* ========================================= */}

                        <section className="rounded-xl border border-white/10 bg-[#101318]">

                            <div className="border-b border-white/10 px-4 py-3.5">

                                <div className="flex items-center gap-2.5">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10">
                                        <MessageSquare className="h-4 w-4 text-fuchsia-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Behavioral Questions
                                        </h3>

                                        <p className="text-[9px] text-zinc-600">
                                            Prepare your stories using the STAR method
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="divide-y divide-white/5">

                                {data.behavioralQuestions?.map((item, index) => {

                                    const isOpen = openBehavioral === index

                                    return (
                                        <div key={index}>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenBehavioral(
                                                        isOpen ? null : index
                                                    )
                                                }
                                                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.02]"
                                            >

                                                <div className="flex gap-3">

                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-[9px] font-semibold text-zinc-500">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>

                                                    <p className="text-xs font-medium leading-5 text-zinc-200">
                                                        {item.question}
                                                    </p>

                                                </div>

                                                {isOpen ? (
                                                    <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-zinc-600" />
                                                ) : (
                                                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-zinc-600" />
                                                )}

                                            </button>

                                            {isOpen && (
                                                <div className="border-t border-white/5 bg-[#0d1014] px-4 py-4">

                                                    <div className="grid gap-3 sm:grid-cols-2">

                                                        <div className="rounded-lg border border-blue-500/10 bg-blue-500/[0.04] p-3">

                                                            <div className="mb-1.5 flex items-center gap-1.5">
                                                                <Lightbulb className="h-3.5 w-3.5 text-blue-400" />

                                                                <span className="text-[9px] font-semibold uppercase tracking-wide text-blue-400">
                                                                    Evaluation Focus
                                                                </span>
                                                            </div>

                                                            <p className="text-[10px] leading-5 text-zinc-500">
                                                                {item.intention}
                                                            </p>

                                                        </div>

                                                        <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] p-3">

                                                            <div className="mb-1.5 flex items-center gap-1.5">
                                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

                                                                <span className="text-[9px] font-semibold uppercase tracking-wide text-emerald-400">
                                                                    Suggested Approach
                                                                </span>
                                                            </div>

                                                            <p className="text-[10px] leading-5 text-zinc-500">
                                                                {item.answer}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            )}

                                        </div>
                                    )
                                })}

                            </div>

                        </section>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <aside className="space-y-5">

                        {/* ========================================= */}
                        {/* SKILL GAPS */}
                        {/* ========================================= */}

                        <section className="rounded-xl border border-white/10 bg-[#101318]">

                            <div className="border-b border-white/10 px-4 py-3.5">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10">
                                        <CircleAlert className="h-3.5 w-3.5 text-orange-400" />
                                    </div>

                                    <h3 className="text-xs font-semibold">
                                        Skill Gaps
                                    </h3>

                                </div>

                            </div>

                            <div className="space-y-2.5 p-4">

                                {data.skillGaps?.map((item, index) => (

                                    <div
                                        key={index}
                                        className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                                    >

                                        <div className="flex items-start justify-between gap-2">

                                            <p className="text-[10px] font-medium leading-4 text-zinc-300">
                                                {item.skill}
                                            </p>

                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-medium ${
                                                    item.severity === 'Medium'
                                                        ? 'bg-yellow-500/10 text-yellow-400'
                                                        : 'bg-blue-500/10 text-blue-400'
                                                }`}
                                            >
                                                {item.severity}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </section>

                        {/* ========================================= */}
                        {/* 7 DAY PLAN */}
                        {/* ========================================= */}

                        <section className="rounded-xl border border-white/10 bg-[#101318]">

                            <div className="border-b border-white/10 px-4 py-3.5">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10">
                                        <CalendarDays className="h-3.5 w-3.5 text-pink-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-semibold">
                                            7-Day Preparation Plan
                                        </h3>

                                        <p className="text-[8px] text-zinc-600">
                                            Focused daily preparation
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="p-3">

                                <div className="space-y-1">

                                    {data.preparationPlan?.map((day) => (

                                        <div
                                            key={day.day}
                                            className="group rounded-lg p-2.5 transition hover:bg-white/[0.03]"
                                        >

                                            <div className="flex gap-2.5">

                                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-pink-500/10 text-[9px] font-bold text-pink-400">
                                                    {day.day}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="text-[10px] font-medium leading-4 text-zinc-300">
                                                        {day.focus}
                                                    </p>

                                                    <ul className="mt-1 space-y-1">

                                                        {day.tasks?.map(
                                                            (task, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex gap-1.5 text-[9px] leading-4 text-zinc-600"
                                                                >
                                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />

                                                                    <span>
                                                                        {task}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}

                                                    </ul>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </section>

                    </aside>

                </div>

                {/* ================= FOOTER ================= */}

                <footer className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-4 sm:flex-row">

                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3 w-3 text-zinc-700" />

                        <span className="text-[9px] text-zinc-700">
                            Your interview preparation is personalized by AI.
                        </span>
                    </div>

                    <p className="text-[9px] text-zinc-700">
                        InterviewAI © {new Date().getFullYear()}
                    </p>

                </footer>

            </div>

        </main>
    )
}