import React from 'react'
import { Bot, LogOut, ListChecks, Home, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

export default function Navbar() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
  }

  // Navigation Links Definition
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Reports', path: '/reports', icon: ListChecks },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl transition-all duration-200">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Brand / Logo */}
        <div
          className="group flex cursor-pointer items-center gap-2.5 transition hover:opacity-90"
          onClick={() => navigate('/')}
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 shadow-inner">
            <Bot className="h-4 w-4 text-pink-400 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-0.5 rounded-xl bg-pink-500/20 blur-sm opacity-0 transition group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
              Interview<span className="text-pink-500">AI</span>
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0d1017]/60 p-1 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30 shadow-sm'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-pink-400' : 'text-zinc-400'}`} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 sm:flex">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 text-[10px] font-bold text-white uppercase">
                {user.email ? user.email[0] : 'U'}
              </div>
              <span className="max-w-[120px] truncate text-xs text-zinc-300">
                {user.email}
              </span>
            </div>
          )}

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 focus:outline-none"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  )
}