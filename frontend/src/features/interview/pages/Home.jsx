'use client'

import { useState, useEffect } from 'react'
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
  Loader2,
  ListChecks,
  Bot,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Briefcase,
  FileCode,
  X,
  Check,
  Brain,
  Target,
  BarChart2
} from 'lucide-react'
import { generateReport } from '../services/interview.api'

// Dynamic messages shown during loading
const LOADING_STEPS = [
  { title: 'Analyzing Requirements', desc: 'Extracting key technical skills & qualifications' },
  { title: 'Parsing Profile & Resume', desc: 'Evaluating candidate history, resume & strengths' },
  { title: 'Identifying Knowledge Gaps', desc: 'Mapping potential weak spots & focus areas' },
  { title: 'Drafting Strategy', desc: 'Formulating tailored questions & high-score answers' },
  { title: 'Finalizing Report', desc: 'Assembling your personalized interview roadmap' },
]

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  
  const [data, setData] = useState({
    jobDescription: '',
    selfDescription: '',
    resume: null,
  })

  // Cycle through loading steps while request is pending
  useEffect(() => {
    let interval
    if (loading) {
      setLoadingStep(0)
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [loading])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setData((prev) => ({ ...prev, resume: file }))
    } else {
      setError('Please upload a PDF or Word document.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!data.jobDescription.trim()) {
      setError('Job description is required.')
      return
    }
    if (!data.resume) {
      setError('Please upload your resume.')
      return
    }
    if (!data.selfDescription.trim()) {
      setError('Please provide a brief self-description.')
      return
    }

    const formData = new FormData()
    formData.append('jobDescription', data.jobDescription)
    formData.append('selfDescription', data.selfDescription)
    formData.append('resume', data.resume)

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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#1c1b1b] text-stone-200 antialiased selection:bg-pink-500/30 selection:text-pink-200">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-b from-pink-600/15 via-purple-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-10 -left-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ================= DETAILED LOADING OVERLAY ================= */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181717]/90 backdrop-blur-xl px-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#232222] p-8 shadow-2xl shadow-black/80">
            
            {/* Top Glowing Orb Accent */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-pink-500/20 blur-2xl" />

            {/* AI Animated Core */}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 opacity-20 duration-1000" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-pink-500/30 bg-gradient-to-br from-[#2a2828] to-[#201f1f] shadow-xl shadow-pink-500/10">
                <Bot className="h-10 w-10 text-pink-400 animate-pulse" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Generating Interview Co-Pilot Strategy
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Synthesizing job requirements with your resume and candidate bio
              </p>
            </div>

            {/* Dynamic Step Status Card */}
            <div className="mt-6 rounded-2xl border border-white/8 bg-[#1c1b1b] p-4 text-left shadow-inner">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-pink-300">
                    {LOADING_STEPS[loadingStep].title}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {LOADING_STEPS[loadingStep].desc}
                  </p>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-stone-400 mb-1.5 font-mono">
                  <span>STEP 0{loadingStep + 1} OF 05</span>
                  <span>{Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 transition-all duration-700 ease-out"
                    style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="mt-5 space-y-2 text-left">
              {LOADING_STEPS.map((step, idx) => {
                const isDone = idx < loadingStep
                const isCurrent = idx === loadingStep
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      isCurrent ? 'bg-white/5 text-stone-200' : 'text-stone-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="h-4 w-4 rounded-full border-2 border-pink-500 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-white/10 shrink-0" />
                    )}
                    <span className={isDone ? 'text-stone-300 font-medium' : isCurrent ? 'text-pink-300 font-semibold' : ''}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="mt-6 text-center text-[11px] text-stone-500">
              ⚡ This typically takes 20-30 seconds. Do not close this window.
            </p>
          </div>
        </div>
      )}

      {/* ================= PAGE CONTAINER ================= */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-4 py-8 lg:px-8">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 shadow-md shadow-pink-500/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-wider text-white uppercase font-mono">PrepAI</span>
              <span className="ml-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[9px] font-semibold text-pink-400">
                PRO v2.4
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/reports')}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-stone-300 backdrop-blur-md transition hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white"
          >
            <ListChecks className="h-4 w-4 text-pink-400 transition group-hover:scale-110" />
            <span>Saved Reports</span>
          </button>
        </header>

        {/* ================= HERO SECTION ================= */}
        <div className="my-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-1.5 text-xs text-pink-300 backdrop-blur-md shadow-inner">
            <Zap className="h-3.5 w-3.5 text-pink-400 fill-pink-400" />
            <span>AI-Powered Interview Copilot</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-tight">
            Ace Your Next Interview with{' '}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Tailored Precision
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs text-stone-400 sm:text-sm">
            Generate custom-built interview strategies, expected technical questions, key gap analyses, and winning answers mapped directly to your exact role and background.
          </p>

          {/* Quick Stats / Highlights Bar */}
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-pink-400" />
              <span>Tailored Skill Mapping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-purple-400" />
              <span>Gap & Strength Breakdown</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Private & Secure</span>
            </div>
          </div>
        </div>

        {/* ================= MAIN INTERACTIVE CARD ================= */}
        <div className="mx-auto w-full max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#222121]/80 backdrop-blur-xl shadow-2xl shadow-black/60"
          >
            <div className="grid lg:grid-cols-12">

              {/* ================= LEFT COLUMN: JOB DESCRIPTION (6 Cols) ================= */}
              <div className="p-6 lg:col-span-6 lg:border-r lg:border-white/8 lg:p-7">
                <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">Target Job Description</h2>
                      <p className="text-[11px] text-stone-400">Paste the target position requirements</p>
                    </div>
                  </div>
                  <span className="rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold text-pink-400">
                    Required *
                  </span>
                </div>

                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={data.jobDescription}
                  onChange={(e) => setData({ ...data, jobDescription: e.target.value })}
                  placeholder="Paste the full job description here (e.g., Responsibilities, Required Tech Stack, Qualifications)..."
                  className="h-[340px] min-h-[260px] resize-none rounded-2xl border-white/10 bg-[#191818] p-4 text-xs leading-relaxed text-stone-200 placeholder:text-stone-600 focus-visible:border-pink-500/60 focus-visible:ring-2 focus-visible:ring-pink-500/20"
                />

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Provide complete details for higher accuracy</span>
                  <span className="font-mono">{data.jobDescription.length} / 10000</span>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: BOTH RESUME & BIO (6 Cols) ================= */}
              <div className="flex flex-col justify-between bg-[#1f1e1e]/60 p-6 lg:col-span-6 lg:p-7">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Your Candidate Details</h2>
                        <p className="text-[11px] text-stone-400">Resume & brief bio required</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold text-pink-400">
                      Both Required *
                    </span>
                  </div>

                  {/* 1. RESUME UPLOAD SECTION */}
                  <div>
                    <Label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-stone-300">
                      <span>1. Upload Resume</span>
                      <span className="text-[10px] text-stone-500">PDF, DOCX</span>
                    </Label>

                    <label
                      htmlFor="resume"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`group relative flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                        isDragging
                          ? 'border-pink-500 bg-pink-500/10'
                          : data.resume
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-white/10 bg-[#171616] hover:border-pink-500/40 hover:bg-[#1c1b1b]'
                      }`}
                    >
                      {data.resume ? (
                        <div className="flex items-center justify-between w-full px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                              <Check className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                              <p className="max-w-[180px] truncate text-xs font-semibold text-stone-200 sm:max-w-[220px]">
                                {data.resume.name}
                              </p>
                              <p className="text-[10px] text-stone-400">
                                {(data.resume.size / 1024 / 1024).toFixed(2)} MB • Attached
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setData({ ...data, resume: null })
                            }}
                            className="flex items-center gap-1 rounded-lg bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20"
                          >
                            <X className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center p-2 text-center">
                          <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 transition group-hover:scale-110">
                            <Upload className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-medium text-stone-300">
                            Drop resume here, or <span className="text-pink-400 underline underline-offset-2">browse</span>
                          </p>
                        </div>
                      )}

                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setData({ ...data, resume: file })
                        }}
                      />
                    </label>
                  </div>

                  {/* 2. SELF BIO SECTION */}
                  <div>
                    <Label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-stone-300">
                      <span>2. Quick Self-Description</span>
                      <span className="text-[10px] text-stone-500">Key Context</span>
                    </Label>

                    <Textarea
                      id="selfDescription"
                      name="selfDescription"
                      value={data.selfDescription}
                      onChange={(e) => setData({ ...data, selfDescription: e.target.value })}
                      placeholder="Briefly state your current role, primary technical skills, years of experience, and key achievements..."
                      className="h-[105px] min-h-[90px] resize-none rounded-2xl border-white/10 bg-[#171616] p-3 text-xs leading-relaxed text-stone-200 placeholder:text-stone-600 focus-visible:border-pink-500/60 focus-visible:ring-2 focus-visible:ring-pink-500/20"
                    />
                  </div>
                </div>

                {/* Submit Section */}
                <div className="mt-5 space-y-3">
                  {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">
                      <X className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-xs font-bold text-white shadow-xl shadow-pink-500/20 transition hover:from-pink-400 hover:to-purple-500 hover:shadow-pink-500/30 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4 fill-white transition group-hover:scale-110" />
                      <span>Generate Preparation Guide</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </div>

            </div>

            {/* Bottom Footer Bar */}
            <div className="flex flex-col items-center justify-between gap-2 border-t border-white/8 bg-[#181717] px-6 py-3 sm:flex-row">
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Your inputs are strictly confidential & encrypted</span>
              </div>
              <div className="flex gap-4 text-[11px] text-stone-500">
                <span className="cursor-pointer transition hover:text-stone-300">Fast AI Processing</span>
                <span>•</span>
                <span className="cursor-pointer transition hover:text-stone-300">Customized QA</span>
              </div>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <footer className="mt-12 text-center text-xs text-stone-600">
          <p>© {new Date().getFullYear()} PrepAI Copilot. Crafted for technical candidates.</p>
        </footer>

      </div>
    </main>
  )
}