    import React, { useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck, BrainCircuit } from 'lucide-react'

    import { Input } from '@/components/ui/input'
    import { Label } from '@/components/ui/label'
    import { Button } from '@/components/ui/button'

    import { useAuth } from '../hooks/useAuth'

    export default function Login() {
        const { loading, handleLogin } = useAuth()
        const navigate = useNavigate()

        const [formData, setFormData] = useState({
            email: '',
            password: '',
        })

        const handleChange = (e) => {
            const { name, value } = e.target

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                await handleLogin(formData)
                navigate('/')
            } catch (error) {
                console.error('Login failed:', error)
            }
        }

        return (
            <main className="h-screen w-full overflow-hidden bg-[#272626] text-white">
                <div className="grid h-full w-full lg:grid-cols-2">

                    {/* ================= LEFT SECTION ================= */}
                    <section className="relative hidden h-full overflow-hidden border-r border-white/8 lg:block">

                        {/* Background glow */}
                        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-pink-600/15 blur-3xl" />
                        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />

                        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">

                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg shadow-pink-500/10">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>

                                <div>
                                    <h1 className="text-lg font-medium tracking-tight">
                                        Interview<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">AI</span>
                                    </h1>

                                    <p className="text-xs text-stone-500">
                                        Smart interview preparation
                                    </p>
                                </div>
                            </div>

                            {/* Main branding */}
                            <div className="max-w-xl">

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#201f1f] px-3 py-1.5 text-xs text-stone-300">
                                    <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                                    AI-powered interview preparation
                                </div>

                                <h2 className="text-4xl font-medium leading-tight xl:text-5xl">
                                    Prepare smarter.
                                    <br />
                                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                                        Interview better.
                                    </span>
                                </h2>

                                <p className="mt-4 max-w-lg text-sm leading-6 text-stone-400">
                                    Practice interviews, analyze your answers, and get
                                    personalized strategies designed around your target
                                    job and experience.
                                </p>

                                {/* Feature list */}
                                <div className="mt-8 space-y-4 border-l border-white/10 pl-5">

                                    <div className="flex gap-3">
                                        <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                                        <div>
                                            <h3 className="text-sm font-medium text-white">
                                                AI interview strategy
                                            </h3>
                                            <p className="mt-0.5 text-xs text-stone-500">
                                                Get interview questions based on your role.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                                        <div>
                                            <h3 className="text-sm font-medium text-white">
                                                Personalized preparation
                                            </h3>
                                            <p className="mt-0.5 text-xs text-stone-500">
                                                Prepare according to your skills and resume.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="text-xs text-stone-600">
                                © {new Date().getFullYear()} InterviewAI. All rights reserved.
                            </div>

                        </div>
                    </section>

                    {/* ================= RIGHT SECTION ================= */}
                    <section className="relative flex h-full w-full items-center justify-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10">

                        {/* Background glow */}
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />

                        {/* Login container */}
                        <div className="relative w-full max-w-sm">

                            {/* Header */}
                            <div className="mb-5">

                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 lg:hidden">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>

                                <h2 className="text-2xl font-medium tracking-tight text-white">
                                    Welcome back
                                </h2>

                                <p className="mt-1 text-sm text-stone-400">
                                    Sign in to continue to InterviewAI
                                </p>
                            </div>

                            {/* Form Card */}
                            <div className="rounded-2xl border border-white/8 bg-[#201f1f] p-5 shadow-2xl shadow-black/20">

                                <form onSubmit={handleSubmit} className="space-y-3.5">

                                    {/* Email */}
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="mb-1.5 block text-sm text-stone-300"
                                        >
                                            Email
                                        </Label>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                autoComplete="email"
                                                required
                                                className="h-10 border-white/10 bg-[#272626] pl-9 text-sm text-white placeholder:text-stone-600 focus:border-pink-500/50 focus:ring-pink-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <Label
                                            htmlFor="password"
                                            className="mb-1.5 block text-sm text-stone-300"
                                        >
                                            Password
                                        </Label>

                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                required
                                                className="h-10 border-white/10 bg-[#272626] pl-9 text-sm text-white placeholder:text-stone-600 focus:border-pink-500/50 focus:ring-pink-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Forgot password */}
                                    <div className="flex justify-end">
                                        <Link
                                            to="/forgot-password"
                                            className="text-xs text-pink-400 transition-colors hover:text-pink-300"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-10 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium shadow-lg shadow-pink-500/10 transition-opacity hover:opacity-90"
                                    >
                                        {loading ? (
                                            'Signing in...'
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Sign In
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        )}
                                    </Button>

                                </form>

                                {/* Register */}
                                <div className="mt-4 border-t border-white/8 pt-4 text-center">
                                    <p className="text-xs text-stone-500">
                                        Don't have an account?{' '}
                                        <Link
                                            to="/register"
                                            className="font-medium text-pink-400 transition-colors hover:text-pink-300"
                                        >
                                            Create account
                                        </Link>
                                    </p>
                                </div>

                            </div>

                            {/* Security text */}
                            <p className="mt-3 text-center text-[11px] text-stone-600">
                                Your information is securely protected.
                            </p>

                        </div>
                    </section>

                </div>
            </main>
        )
    }