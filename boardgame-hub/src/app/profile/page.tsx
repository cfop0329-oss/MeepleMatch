'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ProgressBar from '@/components/ProgressBar'
import { LogOut, Mail, Lock, Trophy, Gamepad2, Calendar, Star } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading, logout, lang } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e2]">
        <div className="text-[#5c5747] text-lg">Загрузка...</div>
      </div>
    )
  }

  const progressPercentage = (user.level / user.maxLevel) * 100

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Фоновое изображение */}
      <div className="page-background" />
      
      {/* Контент */}
      <div className="relative z-10">
        {/* Шапка */}
        <div className="bg-gradient-to-b from-amber-900/95 to-amber-950/95 backdrop-blur-sm border-b-4 border-amber-950 shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Trophy className="text-amber-200" size={28} />
                <div>
                  <h1 className="font-cinzel text-2xl font-bold text-amber-50">
                    {t('profile', lang)}
                  </h1>
                  <p className="font-lora text-xs text-amber-200">
                    Твой игровой путь
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={() => { logout(); router.push('/auth/login') }}
                  className="p-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
                  title={t('logout', lang)}
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Левая колонка */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-amber-50/95 to-amber-100/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-amber-900 shadow-2xl relative overflow-hidden">
                {/* Декоративные уголки */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-900/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-900/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-900/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-900/30 rounded-br-lg" />

                {/* Аватар */}
                <div className="text-center mb-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-950">
                    <span className="text-4xl font-cinzel font-bold text-amber-50">
                      {user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-cinzel text-lg font-bold text-amber-950 mt-3 truncate">
                    {user.email.split('@')[0]}
                  </h2>
                  <p className="font-lora text-xs text-amber-700">
                    {user.email}
                  </p>
                </div>

                {/* Уровень */}
                <div className="bg-amber-200/50 rounded-xl p-4 border-2 border-amber-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-700" size={18} />
                      <span className="font-cinzel font-bold text-amber-950 text-sm">
                        {t('level', lang)}
                      </span>
                    </div>
                    <span className="font-cinzel font-bold text-amber-900">
                      {user.level}
                    </span>
                  </div>
                  <ProgressBar current={user.level} max={user.maxLevel} />
                  <div className="text-center mt-2">
                    <span className="font-lora text-xs text-amber-700">
                      {user.maxLevel - user.level} XP до следующего уровня
                    </span>
                  </div>
                </div>

                {/* Статистика */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between bg-amber-200/30 rounded-lg p-2 border border-amber-900/20">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="text-amber-700" size={16} />
                      <span className="font-lora text-xs text-amber-900">Игр сыграно</span>
                    </div>
                    <span className="font-cinzel font-bold text-amber-900 text-sm">12</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-200/30 rounded-lg p-2 border border-amber-900/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-amber-700" size={16} />
                      <span className="font-lora text-xs text-amber-900">На сайте</span>
                    </div>
                    <span className="font-cinzel font-bold text-amber-900 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-br from-amber-50/95 to-amber-100/95 backdrop-blur-sm rounded-2xl p-6 border-4 border-amber-900 shadow-2xl relative overflow-hidden">
                {/* Декоративные уголки */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-900/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-900/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-900/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-900/30 rounded-br-lg" />

                <h3 className="font-cinzel text-xl font-bold text-amber-950 mb-4">
                  {t('profileData', lang)}
                </h3>

                <div className="space-y-4">
                  {/* Почта */}
                  <div className="bg-amber-200/30 rounded-xl p-4 border-2 border-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="text-amber-50" size={20} />
                      </div>
                      <div className="flex-1">
                        <label className="block font-lora text-xs text-amber-700 mb-1">
                          {t('email', lang)}
                        </label>
                        <div className="font-cinzel font-bold text-amber-950 text-sm">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Пароль */}
                  <div className="bg-amber-200/30 rounded-xl p-4 border-2 border-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="text-amber-50" size={20} />
                      </div>
                      <div className="flex-1">
                        <label className="block font-lora text-xs text-amber-700 mb-1">
                          {t('password', lang)}
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="font-cinzel font-bold text-amber-950 text-sm">
                            {showPassword ? user.password : '••••••••'}
                          </div>
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-xs text-amber-700 hover:text-amber-900 font-lora underline"
                          >
                            {showPassword ? 'Скрыть' : 'Показать'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ID пользователя */}
                  <div className="bg-amber-200/30 rounded-xl p-4 border-2 border-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trophy className="text-amber-50" size={20} />
                      </div>
                      <div className="flex-1">
                        <label className="block font-lora text-xs text-amber-700 mb-1">
                          ID пользователя
                        </label>
                        <div className="font-mono text-xs text-amber-900 bg-amber-100/50 rounded px-2 py-1 inline-block">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Дата регистрации */}
                  <div className="bg-amber-200/30 rounded-xl p-4 border-2 border-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-amber-50" size={20} />
                      </div>
                      <div className="flex-1">
                        <label className="block font-lora text-xs text-amber-700 mb-1">
                          Дата регистрации
                        </label>
                        <div className="font-cinzel font-bold text-amber-950 text-sm">
                          {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="btn-wood py-2.5 rounded-lg font-cinzel font-bold text-sm flex items-center justify-center gap-2">
                    <Gamepad2 size={16} />
                    Мои игры
                  </button>
                  <button
                    onClick={() => { logout(); router.push('/auth/login') }}
                    className="bg-red-100 border-2 border-red-700/30 text-red-800 py-2.5 rounded-lg font-cinzel font-bold text-sm hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    {t('logout', lang)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}