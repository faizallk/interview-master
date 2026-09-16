'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import {
    User,
    Mail,
    Lock,
    Sparkles,
    ArrowRight,
    Brain,
    Target,
    FileText,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await handleRegister(formData)
            navigate('/')
        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    return (
        <main className="h-screen w-full overflow-hidden bg-[#090b0f] text-white">
            <div className="grid h-full w-full lg:grid-cols-2">

                {/* ================================================= */}
                {/* LEFT SIDE - BRANDING */}
                {/* ================================================= */}

                <section className="relative hidden h-full overflow-hidden border-r border-white/10 lg:flex">

                    {/* Background Glow */}
                    <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-pink-600/10 blur-[110px]" />

                    <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[110px]" />

                    <div className="relative flex h-full w-full flex-col justify-between p-8 xl:p-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10">
                                <Sparkles className="h-4 w-4 text-pink-500" />
                            </div>

                            <div>
                                <span className="text-lg font-bold tracking-tight">
                                    Interview
                                    <span className="text-pink-500">AI</span>
                                </span>

                                <p className="text-[10px] text-zinc-600">
                                    Smart Interview Preparation
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="max-w-lg">

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-zinc-400">
                                <Sparkles className="h-3 w-3 text-pink-500" />
                                AI-Powered Interview Preparation
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                                Start Your
                                <br />

                                <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                                    Interview Journey.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-md text-sm leading-5 text-zinc-500">
                                Create your account and get personalized interview
                                preparation powered by AI. Understand the role,
                                improve your skills, and prepare with confidence.
                            </p>

                            {/* Features */}
                            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">

                                {/* Feature 1 */}
                                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                                    <Target className="mb-2 h-4 w-4 text-pink-500" />

                                    <h3 className="text-xs font-semibold text-zinc-200">
                                        Job Analysis
                                    </h3>

                                    <p className="mt-1 text-[10px] leading-4 text-zinc-600">
                                        Understand exactly what companies are looking for.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                                    <Brain className="mb-2 h-4 w-4 text-purple-500" />

                                    <h3 className="text-xs font-semibold text-zinc-200">
                                        AI Strategy
                                    </h3>

                                    <p className="mt-1 text-[10px] leading-4 text-zinc-600">
                                        Get a personalized interview preparation plan.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                                    <FileText className="mb-2 h-4 w-4 text-fuchsia-500" />

                                    <h3 className="text-xs font-semibold text-zinc-200">
                                        Resume Analysis
                                    </h3>

                                    <p className="mt-1 text-[10px] leading-4 text-zinc-600">
                                        Match your experience against the role.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-[10px] text-zinc-700">
                            © {new Date().getFullYear()} InterviewAI. All rights reserved.
                        </p>

                    </div>
                </section>

                {/* ================================================= */}
                {/* RIGHT SIDE - REGISTER */}
                {/* ================================================= */}

                <section className="relative flex h-full w-full items-center justify-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10">

                    {/* Background Glow */}
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />

                    {/* Register Container */}
                    <div className="relative w-full max-w-sm">

                        {/* Mobile Logo */}
                        <div className="mb-5 flex items-center justify-center gap-2 lg:hidden">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10">
                                <Sparkles className="h-4 w-4 text-pink-500" />
                            </div>

                            <span className="text-lg font-bold">
                                Interview
                                <span className="text-pink-500">AI</span>
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-5">

                            <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10">
                                <User className="h-4 w-4 text-pink-500" />
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-white">
                                Create your account
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Join InterviewAI and start preparing smarter.
                            </p>

                        </div>

                        {/* Form Card */}
                        <div className="rounded-xl border border-white/10 bg-[#101318] p-5 shadow-2xl shadow-black/20">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-3.5"
                            >

                                {/* Username */}
                                <div>
                                    <Label
                                        htmlFor="username"
                                        className="mb-1.5 block text-xs font-medium text-zinc-400"
                                    >
                                        Username
                                    </Label>

                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            required
                                            autoComplete="username"
                                            value={formData.username}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    username: e.target.value,
                                                })
                                            }
                                            placeholder="Enter your username"
                                            className="h-10 rounded-lg border-white/10 bg-[#13161c] pl-10 text-sm text-zinc-200 placeholder:text-zinc-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="mb-1.5 block text-xs font-medium text-zinc-400"
                                    >
                                        Email Address
                                    </Label>

                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            placeholder="name@example.com"
                                            className="h-10 rounded-lg border-white/10 bg-[#13161c] pl-10 text-sm text-zinc-200 placeholder:text-zinc-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="mb-1.5 block text-xs font-medium text-zinc-400"
                                    >
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value,
                                                })
                                            }
                                            placeholder="••••••••"
                                            className="h-10 rounded-lg border-white/10 bg-[#13161c] pl-10 text-sm text-zinc-200 placeholder:text-zinc-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>

                                    <p className="mt-1 text-[10px] text-zinc-600">
                                        Use a strong password with at least 8 characters.
                                    </p>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-10 w-full rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition hover:from-pink-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>

                            </form>

                            {/* Login */}
                            <div className="mt-4 border-t border-white/10 pt-4 text-center">
                                <p className="text-xs text-zinc-500">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="font-medium text-pink-500 transition hover:text-pink-400"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                        </div>

                        {/* Bottom Links */}
                        <div className="mt-3 flex justify-center gap-4 text-[10px] text-zinc-700">
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                            <span>Help Center</span>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    )
}