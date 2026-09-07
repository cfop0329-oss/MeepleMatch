'use client'

import { useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function LoginPage() {
  const router = useRouter()
  const { lang } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = login(email, password)
    if (!result.success) {
      setError(result.error || 'Ошибка')
    } else {
      router.push('/profile')
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jfif)',
        }}
      >
        {/* Кремовый оверлей сверху */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f1e2]/80 via-[#e8e5d4]/60 to-[#d4d0be]/70" />
        <div className="absolute inset-0 bg-[#f3f1e2]/10 mix-blend-overlay" />
      </div>

      {/* Контент */}
      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-[#d4d0be]/50 shadow-2xl relative overflow-hidden">
          {/* Декоративные блики */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#b8a88a]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#9e8f6f]/20 rounded-full blur-3xl" />

          {/* Логотип */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#b8a88a] via-[#9e8f6f] to-[#7a6f55] rounded-2xl flex items-center justify-center shadow-lg shadow-[#b8a88a]/30 transform hover:scale-105 transition-transform duration-300">
                <svg
                  viewBox="0 0 100 100"
                  className="w-14 h-14 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="10" y="10" width="80" height="80" rx="12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3"/>
                  <circle cx="35" cy="35" r="6" fill="currentColor"/>
                  <circle cx="65" cy="35" r="6" fill="currentColor"/>
                  <circle cx="50" cy="50" r="6" fill="currentColor"/>
                  <circle cx="35" cy="65" r="6" fill="currentColor"/>
                  <circle cx="65" cy="65" r="6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#2d2a24] mb-2 tracking-tight">
              MeepleMatch
            </h1>
            <p className="text-[#5c5747] text-sm font-medium">
              {t('login', lang)} и начни играть
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-[#2d2a24] mb-2 text-sm font-medium">
                {t('email', lang)}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.kz"
                  required
                  className="w-full px-4 py-3.5 bg-white/80 border border-[#d4d0be] rounded-xl text-[#2d2a24] placeholder-[#9e9984] focus:outline-none focus:ring-2 focus:ring-[#b8a88a] focus:border-transparent transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9e9984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#2d2a24] mb-2 text-sm font-medium">
                {t('password', lang)}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 bg-white/80 border border-[#d4d0be] rounded-xl text-[#2d2a24] placeholder-[#9e9984] focus:outline-none focus:ring-2 focus:ring-[#b8a88a] focus:border-transparent transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9e9984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#b8a88a] via-[#9e8f6f] to-[#7a6f55] text-white py-3.5 rounded-xl font-semibold hover:from-[#a89878] hover:via-[#8e7f5f] hover:to-[#6a5f45] transition-all duration-300 shadow-lg shadow-[#b8a88a]/30 hover:shadow-[#b8a88a]/50 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {t('login', lang)}
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-[#5c5747] text-sm">
              {t('noAccount', lang)}{' '}
              <a
                href="/auth/register"
                className="text-[#7a6f55] hover:text-[#5c5747] font-semibold transition-colors inline-flex items-center gap-1 group"
              >
                {t('register', lang)}
                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}