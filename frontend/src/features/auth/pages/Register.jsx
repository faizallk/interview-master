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
        <main className="h-screen w-full overflow-hidden bg-[#272626] text-white">
            <div className="grid h-full w-full lg:grid-cols-2">

                {/* ================================================= */}
                {/* LEFT SIDE - BRANDING */}
                {/* ================================================= */}

                <section className="relative hidden h-full overflow-hidden border-r border-white/8 lg:flex">

                    {/* Background Glow */}
                    <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-pink-600/10 blur-[110px]" />

                    <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[110px]" />

                    <div className="relative flex h-full w-full flex-col justify-between p-8 xl:p-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>

                            <div>
                                <span className="text-lg font-medium tracking-tight">
                                    Interview
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">AI</span>
                                </span>

                                <p className="text-[10px] text-stone-500">
                                    Smart interview preparation
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="max-w-lg">

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#201f1f] px-3 py-1.5 text-[10px] text-stone-300">
                                <Sparkles className="h-3 w-3 text-pink-400" />
                                AI-powered interview preparation
                            </div>

                            <h1 className="text-4xl font-medium leading-tight tracking-tight xl:text-5xl">
                                Start your
                                <br />
                                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                                    interview journey.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-md text-sm leading-5 text-stone-400">
                                Create your account and get personalized interview
                                preparation powered by AI. Understand the role,
                                improve your skills, and prepare with confidence.
                            </p>

                            {/* Features */}
                            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">

                                {/* Feature 1 */}
                                <div className="rounded-xl border border-white/8 bg-[#201f1f] p-3.5">
                                    <Target className="mb-2 h-4 w-4 text-pink-400" />
                                    <h3 className="text-xs font-medium text-stone-200">
                                        Job analysis
                                    </h3>
                                    <p className="mt-1 text-[10px] leading-4 text-stone-500">
                                        Understand exactly what companies are looking for.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="rounded-xl border border-white/8 bg-[#201f1f] p-3.5">
                                    <Brain className="mb-2 h-4 w-4 text-purple-400" />
                                    <h3 className="text-xs font-medium text-stone-200">
                                        AI strategy
                                    </h3>
                                    <p className="mt-1 text-[10px] leading-4 text-stone-500">
                                        Get a personalized interview preparation plan.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="rounded-xl border border-white/8 bg-[#201f1f] p-3.5">
                                    <FileText className="mb-2 h-4 w-4 text-fuchsia-400" />
                                    <h3 className="text-xs font-medium text-stone-200">
                                        Resume analysis
                                    </h3>
                                    <p className="mt-1 text-[10px] leading-4 text-stone-500">
                                        Match your experience against the role.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-[10px] text-stone-600">
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
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>

                            <span className="text-lg font-medium">
                                Interview
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">AI</span>
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-5">

                            <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                                <User className="h-4 w-4 text-white" />
                            </div>

                            <h2 className="text-2xl font-medium tracking-tight text-white">
                                Create your account
                            </h2>

                            <p className="mt-1 text-sm text-stone-400">
                                Join InterviewAI and start preparing smarter.
                            </p>

                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl border border-white/8 bg-[#201f1f] p-5 shadow-2xl shadow-black/20">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-3.5"
                            >

                                {/* Username */}
                                <div>
                                    <Label
                                        htmlFor="username"
                                        className="mb-1.5 block text-xs font-medium text-stone-400"
                                    >
                                        Username
                                    </Label>

                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

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
                                            className="h-10 rounded-lg border-white/10 bg-[#272626] pl-10 text-sm text-stone-200 placeholder:text-stone-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="mb-1.5 block text-xs font-medium text-stone-400"
                                    >
                                        Email address
                                    </Label>

                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

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
                                            className="h-10 rounded-lg border-white/10 bg-[#272626] pl-10 text-sm text-stone-200 placeholder:text-stone-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="mb-1.5 block text-xs font-medium text-stone-400"
                                    >
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

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
                                            className="h-10 rounded-lg border-white/10 bg-[#272626] pl-10 text-sm text-stone-200 placeholder:text-stone-600 shadow-none focus-visible:border-pink-500/50 focus-visible:ring-1 focus-visible:ring-pink-500/20"
                                        />
                                    </div>

                                    <p className="mt-1 text-[10px] text-stone-600">
                                        Use a strong password with at least 8 characters.
                                    </p>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-10 w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium text-white shadow-lg shadow-pink-500/10 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
                            <div className="mt-4 border-t border-white/8 pt-4 text-center">
                                <p className="text-xs text-stone-500">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="font-medium text-pink-400 transition-colors hover:text-pink-300"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                        </div>

                        {/* Bottom Links */}
                        <div className="mt-3 flex justify-center gap-4 text-[10px] text-stone-600">
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