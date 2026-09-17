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
  CheckSquare,
  Square,
  Layers,
  Award,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getReport } from '../services/interview.api'

export default function Interview() {
  const { interview } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Accordion active state tracking
  const [openTechnical, setOpenTechnical] = useState(null)
  const [openBehavioral, setOpenBehavioral] = useState(null)

  // Active Main View Tab
  const [activeTab, setActiveTab] = useState('technical')

  // Interactive Task Completion Tracker for 7-Day Plan
  const [completedTasks, setCompletedTasks] = useState({})

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getReport(interview)
        setData(res.interviewReport)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [interview])

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center bg-[#07090e] text-white">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-ping rounded-full bg-pink-500/20" />
          <Sparkles className="absolute h-8 w-8 animate-pulse text-pink-500" />
        </div>
        <p className="mt-4 text-xs font-medium tracking-wide text-zinc-400">
          Synthesizing your AI Interview Strategy...
        </p>
      </main>
    )
  }

  /* ================= ERROR STATE ================= */
  if (error || !data) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-[#07090e] text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0d1017] p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500">
            <CircleAlert className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold text-white">Report Not Found</h1>
          <p className="mt-2 text-xs text-zinc-400">
            We couldn't retrieve this report. It may have expired, been deleted, or you may lack access permissions.
          </p>
          <Button
            onClick={() => navigate('/reports')}
            className="mt-6 h-9 w-full rounded-xl bg-gradient-to-r from-pink-600 to-fuchsia-600 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 hover:opacity-90"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Dashboard
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-[#07090e] text-white selection:bg-pink-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent blur-3xl" />

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
              <Sparkles className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">
                Interview<span className="text-pink-500">AI</span>
              </h1>
              <p className="hidden text-[10px] text-zinc-500 sm:block">
                Tailored Candidate Intelligence
              </p>
            </div>
          </div>

          {/* Header Action Badges & Navigation */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400 sm:flex">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Strategy Ready</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-white/10 bg-white/5 text-xs text-zinc-300 hover:bg-white/10 hover:text-white"
              onClick={() => navigate('/reports')}
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back
            </Button>
          </div>
        </div>
      </header>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-0.5 text-xs font-medium text-pink-400">
                <Sparkles className="h-3 w-3" />
                AI Strategy Report
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Interview Preparation Plan
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Personalized roadmap designed according to your target role requirements and candidate experience.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATS OVERVIEW CARDS ================= */}
        <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Match Score */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-md transition hover:border-pink-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">Profile Match</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white">{data.matchScore || 0}%</span>
              <span className="flex items-center text-[10px] text-emerald-400 font-medium">
                <TrendingUp className="mr-0.5 h-3 w-3" /> High Fit
              </span>
            </div>
            {/* Visual Match Bar */}
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                style={{ width: `${Math.min(data.matchScore || 0, 100)}%` }}
              />
            </div>
          </div>

          {/* Technical Questions Count */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-md transition hover:border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">Technical Qs</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Code2 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              {data.technicalQuestions?.length || 0}
            </p>
            <p className="mt-1 text-[10px] text-zinc-500">Domain-specific focus</p>
          </div>

          {/* Behavioral Questions Count */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-md transition hover:border-fuchsia-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">Behavioral Qs</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                <MessageSquare className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              {data.behavioralQuestions?.length || 0}
            </p>
            <p className="mt-1 text-[10px] text-zinc-500">STAR Method framework</p>
          </div>

          {/* Identified Skill Gaps */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-md transition hover:border-orange-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">Skill Gaps</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <CircleAlert className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              {data.skillGaps?.length || 0}
            </p>
            <p className="mt-1 text-[10px] text-zinc-500">Areas to review</p>
          </div>
        </section>

        {/* ================= MAIN CONTENT SPLIT ================= */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          
          {/* LEFT SIDE: TABBED NAVIGATION & MAIN INTERVIEW CONTENT */}
          <div className="space-y-6">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d1017] p-1.5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('technical')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
                  activeTab === 'technical'
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code2 className="h-4 w-4 text-purple-400" />
                Technical
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                  {data.technicalQuestions?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('behavioral')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition ${
                  activeTab === 'behavioral'
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageSquare className="h-4 w-4 text-fuchsia-400" />
                Behavioral
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                  {data.behavioralQuestions?.length || 0}
                </span>
              </button>
            </div>

            {/* TAB CONTENT: TECHNICAL QUESTIONS */}
            {activeTab === 'technical' && (
              <section className="rounded-2xl border border-white/10 bg-[#0d1017]/80 backdrop-blur-md overflow-hidden">
                <div className="border-b border-white/10 p-4 sm:px-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-purple-400" /> Technical Assessment Questions
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Click on any question to expand interviewer expectations and sample answers.
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {data.technicalQuestions?.map((item, index) => {
                    const isOpen = openTechnical === index
                    return (
                      <div key={index} className="transition hover:bg-white/[0.01]">
                        <button
                          type="button"
                          onClick={() => setOpenTechnical(isOpen ? null : index)}
                          className="flex w-full items-start justify-between gap-4 p-4 text-left sm:px-6"
                        >
                          <div className="flex gap-3.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-xs font-bold text-purple-400 border border-purple-500/20">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-xs font-semibold leading-relaxed text-zinc-100">
                                {item.question}
                              </p>
                              {!isOpen && (
                                <p className="mt-1 text-[11px] text-zinc-500">
                                  Click to reveal evaluation framework
                                </p>
                              )}
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                          )}
                        </button>

                        {/* Expandable Answers & Intention */}
                        {isOpen && (
                          <div className="border-t border-white/5 bg-[#080a0f] p-4 sm:px-6 space-y-3">
                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5">
                              <div className="mb-1 flex items-center gap-1.5 text-blue-400">
                                <Lightbulb className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  What the Interviewer Evaluates
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-zinc-300">
                                {item.intention}
                              </p>
                            </div>

                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                              <div className="mb-1 flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  Recommended Answer Blueprint
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-zinc-300">
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
            )}

            {/* TAB CONTENT: BEHAVIORAL QUESTIONS */}
            {activeTab === 'behavioral' && (
              <section className="rounded-2xl border border-white/10 bg-[#0d1017]/80 backdrop-blur-md overflow-hidden">
                <div className="border-b border-white/10 p-4 sm:px-6">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-fuchsia-400" /> Behavioral & Leadership Scenarios
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Structure your responses using the **STAR** method (Situation, Task, Action, Result).
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {data.behavioralQuestions?.map((item, index) => {
                    const isOpen = openBehavioral === index
                    return (
                      <div key={index} className="transition hover:bg-white/[0.01]">
                        <button
                          type="button"
                          onClick={() => setOpenBehavioral(isOpen ? null : index)}
                          className="flex w-full items-start justify-between gap-4 p-4 text-left sm:px-6"
                        >
                          <div className="flex gap-3.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10 text-xs font-bold text-fuchsia-400 border border-fuchsia-500/20">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-xs font-semibold leading-relaxed text-zinc-100">
                                {item.question}
                              </p>
                              {!isOpen && (
                                <p className="mt-1 text-[11px] text-zinc-500">
                                  Click to view key competencies & recommended approach
                                </p>
                              )}
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                          )}
                        </button>

                        {/* Expandable Answers */}
                        {isOpen && (
                          <div className="border-t border-white/5 bg-[#080a0f] p-4 sm:px-6 space-y-3">
                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5">
                              <div className="mb-1 flex items-center gap-1.5 text-blue-400">
                                <Lightbulb className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  Evaluation Focus
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-zinc-300">
                                {item.intention}
                              </p>
                            </div>

                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                              <div className="mb-1 flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                  Suggested Approach
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-zinc-300">
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
            )}

          </div>

          {/* RIGHT SIDEBAR: SKILL GAPS & INTERACTIVE 7-DAY PLAN */}
          <aside className="space-y-6">
            
            {/* SKILL GAPS CARD */}
            <section className="rounded-2xl border border-white/10 bg-[#0d1017]/80 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <CircleAlert className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Identified Skill Gaps
                </h3>
              </div>

              <div className="space-y-2.5">
                {data.skillGaps?.map((item, index) => {
                  const isHigh = item.severity?.toLowerCase() === 'high'
                  const isMedium = item.severity?.toLowerCase() === 'medium'

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10"
                    >
                      <span className="text-xs font-medium text-zinc-200">
                        {item.skill}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                          isHigh
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : isMedium
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 7-DAY PREPARATION ROADMAP */}
            <section className="rounded-2xl border border-white/10 bg-[#0d1017]/80 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    7-Day Action Plan
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {data.preparationPlan?.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:bg-white/[0.03]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pink-500/20 text-[10px] font-extrabold text-pink-400">
                        D{day.day}
                      </span>
                      <p className="text-xs font-bold text-zinc-200">{day.focus}</p>
                    </div>

                    <ul className="space-y-2 pl-1">
                      {day.tasks?.map((task, tIdx) => {
                        const isDone = completedTasks[`${dIdx}-${tIdx}`]
                        return (
                          <li
                            key={tIdx}
                            onClick={() => toggleTask(dIdx, tIdx)}
                            className="flex cursor-pointer items-start gap-2 text-[11px] text-zinc-400 transition hover:text-zinc-200"
                          >
                            {isDone ? (
                              <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pink-500" />
                            ) : (
                              <Square className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
                            )}
                            <span className={isDone ? 'line-through text-zinc-500' : ''}>
                              {task}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </aside>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-pink-500" />
            <span>AI-generated interview strategy personalized to your candidate profile.</span>
          </div>
          <p>© {new Date().getFullYear()} InterviewAI Inc. All rights reserved.</p>
        </footer>

      </div>
    </main>
  )
}