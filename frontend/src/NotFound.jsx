import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#090b0f] text-white">

            {/* Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/10 blur-[120px]" />

            <div className="relative z-10 w-full max-w-md px-5 text-center">

                {/* Logo */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10">
                        <Sparkles className="h-4 w-4 text-pink-500" />
                    </div>

                    <span className="text-lg font-bold tracking-tight">
                        Interview
                        <span className="text-pink-500">AI</span>
                    </span>
                </div>

                {/* 404 */}
                <div className="relative">
                    <h1 className="text-[110px] font-black leading-none tracking-tighter sm:text-[130px]">
                        <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                            404
                        </span>
                    </h1>
                </div>

                {/* Content */}
                <div className="mt-5">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Page not found
                    </h2>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                        Looks like this page doesn't exist or may have been
                        moved to another location.
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                    <Button
                        asChild
                        className="h-10 rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-600 px-5 text-sm font-medium shadow-lg shadow-pink-600/20 hover:from-pink-500 hover:to-fuchsia-500"
                    >
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="h-10 rounded-lg border-white/10 bg-white/[0.02] px-5 text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                    >
                        <Link to={-1}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>

                </div>

                {/* Bottom text */}
                <p className="mt-8 text-[10px] text-zinc-700">
                    © {new Date().getFullYear()} InterviewAI. All rights reserved.
                </p>

            </div>
        </main>
    )
}