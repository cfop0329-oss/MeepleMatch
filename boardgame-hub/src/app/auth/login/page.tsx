'use client'

import { useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { LogIn } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎲</div>
          <h1 className="text-3xl font-bold text-white">BoardGame Hub</h1>
          <p className="text-white/50 mt-1">{t('login', lang)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 mb-1 text-sm">{t('email', lang)}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.kz"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">{t('password', lang)}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {t('login', lang)}
          </button>
        </form>

        <p className="text-white/40 text-center mt-6 text-sm">
          {t('noAccount', lang)}{' '}
          <a href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium">
            {t('register', lang)}
          </a>
        </p>
      </div>
    </div>
  )
}