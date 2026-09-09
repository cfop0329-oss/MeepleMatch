'use client'

import { useState } from 'react'
import { register } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function RegisterPage() {
  const router = useRouter()
  const { lang , refreshUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = register(email, password)
    if (!result.success) {
      setError(result.error || 'Ошибка')
    } else {
      refreshUser() // <-- ДОБАВИЛИ ЭТУ СТРОКУ
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <div className="relative book-shadow">
          {/* Деревянная обложка */}
          <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 rounded-lg p-4 border-4 border-amber-950">
            {/* Металлические уголки */}
            <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-tl-lg border-2 border-yellow-950 shadow-md" />
            <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-yellow-700 to-yellow-900 rounded-tr-lg border-2 border-yellow-950 shadow-md" />
            <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-yellow-700 to-yellow-900 rounded-bl-lg border-2 border-yellow-950 shadow-md" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tl from-yellow-700 to-yellow-900 rounded-br-lg border-2 border-yellow-950 shadow-md" />

            {/* Пергамент */}
            <div className="relative parchment-bg rounded p-8 min-w-[420px]">
              {/* Декоративные уголки — сюда вставь PNG */}
              <div className="decor-corner decor-corner-tl" />
              <div className="decor-corner decor-corner-tr" />
              <div className="decor-corner decor-corner-bl" />
              <div className="decor-corner decor-corner-br" />

              {/* Декоративные миплы — сюда вставь PNG */}
              <div className="decor-meeple decor-meeple-left" />
              <div className="decor-meeple decor-meeple-right" />

              {/* Логотип */}
              <div className="text-center mb-6 relative z-10">
                <div className="inline-block mb-3">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-16 h-16 mx-auto"
                    style={{ color: '#5c3a21' }}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="10" y="10" width="80" height="80" rx="12" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="35" cy="35" r="6" fill="currentColor"/>
                    <circle cx="65" cy="35" r="6" fill="currentColor"/>
                    <circle cx="50" cy="50" r="6" fill="currentColor"/>
                    <circle cx="35" cy="65" r="6" fill="currentColor"/>
                    <circle cx="65" cy="65" r="6" fill="currentColor"/>
                  </svg>
                </div>
                <h1 className="font-cinzel text-4xl font-bold mb-2" style={{ color: '#2d1810' }}>
                  MeepleMatch
                </h1>
                <p className="font-lora text-sm" style={{ color: '#5c3a21' }}>
                  {t('register', lang)} и найди свою игровую компанию
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block font-lora text-sm font-medium mb-2" style={{ color: '#5c3a21' }}>
                    {t('email', lang)}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.kz"
                      required
                      className="input-embossed w-full px-4 py-3 rounded font-lora"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#5c3a21' }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-lora text-sm font-medium mb-2" style={{ color: '#5c3a21' }}>
                    {t('password', lang)}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="input-embossed w-full px-4 py-3 rounded font-lora"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#5c3a21' }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="font-lora text-xs mt-1" style={{ color: '#8b5a2b' }}>Минимум 6 символов</p>
                </div>

                {error && (
                  <div className="bg-red-100/80 border-2 border-red-400 rounded p-3 text-red-800 text-sm text-center font-lora">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-wood w-full py-3.5 rounded font-cinzel font-bold text-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  {t('register', lang)}
                </button>
              </form>

              <div className="mt-6 text-center relative z-10">
                <p className="font-lora text-sm italic" style={{ color: '#5c3a21' }}>
                  {t('hasAccount', lang)}{' '}
                  <a
                    href="/auth/login"
                    className="font-bold hover:underline inline-flex items-center gap-1"
                    style={{ color: '#2d1810' }}
                  >
                    {t('login', lang)}
                    <span>›</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}