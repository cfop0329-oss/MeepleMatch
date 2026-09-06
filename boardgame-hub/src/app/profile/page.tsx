'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import ProgressBar from '@/components/ProgressBar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { LogOut, Mail, Lock } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading, logout, lang } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">🎲 Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 p-6">
      <div className="max-w-lg mx-auto">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{t('profile', lang)}</h1>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => { logout(); router.push('/auth/login') }}
              className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Уровень */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              🎲
            </div>
            <div>
              <div className="text-white/50 text-sm">{t('level', lang)}</div>
              <div className="text-white text-xl font-bold">{user.level} / {user.maxLevel}</div>
            </div>
          </div>
          <ProgressBar current={user.level} max={user.maxLevel} />
        </div>

        {/* Данные профиля */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">{t('profileData', lang)}</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/70">
              <Mail size={16} />
              <span className="text-sm">{t('email', lang)}:</span>
              <span className="text-white ml-auto text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Lock size={16} />
              <span className="text-sm">{t('password', lang)}:</span>
              <span className="text-white ml-auto text-sm">{'•'.repeat(8)}</span>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}