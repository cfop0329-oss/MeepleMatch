'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import MapComponent from '@/components/MapComponent'
import { MapPin, Plus } from 'lucide-react'

export default function MapPage() {
  const { user, loading, lang } = useAuth()
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e2]">
        <div className="text-[#5c5747] text-lg">🎲 Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 bg-[#f3f1e2]">
      {/* Шапка */}
      <div className="bg-gradient-to-b from-amber-900 to-amber-950 border-b-4 border-amber-950 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MapPin className="text-amber-200" size={28} />
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-amber-50">
                  {t('map', lang)}
                </h1>
                <p className="font-lora text-xs text-amber-200">
                  Найди клуб или компанию рядом
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-wood px-4 py-2 rounded-lg font-cinzel font-bold text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Создать сбор
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Карта */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="h-[calc(100vh-220px)] min-h-[500px]">
          <MapComponent />
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 border-2 border-amber-900/30 shadow-lg">
            <div className="font-cinzel text-3xl font-bold text-amber-900">5</div>
            <div className="font-lora text-sm text-amber-800">Клубов рядом</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 border-2 border-amber-900/30 shadow-lg">
            <div className="font-cinzel text-3xl font-bold text-amber-900">5</div>
            <div className="font-lora text-sm text-amber-800">Игроков онлайн</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-4 border-2 border-amber-900/30 shadow-lg">
            <div className="font-cinzel text-3xl font-bold text-amber-900">12</div>
            <div className="font-lora text-sm text-amber-800">Активных сборов</div>
          </div>
        </div>
      </div>

      {/* Модальное окно создания сбора */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 max-w-md w-full border-4 border-amber-900 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-3 text-amber-900 hover:text-amber-950 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="font-cinzel text-2xl font-bold text-amber-950 mb-4">
              Создать сбор
            </h2>
            <form className="space-y-3">
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Игра
                </label>
                <input
                  type="text"
                  placeholder="Например: D&D 5e"
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Сколько игроков нужно
                </label>
                <input
                  type="number"
                  placeholder="2"
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Когда
                </label>
                <input
                  type="text"
                  placeholder="Сегодня, 19:00"
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Где
                </label>
                <input
                  type="text"
                  placeholder="Dice & Coffee, ул. Абая 52"
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="btn-wood w-full py-3 rounded font-cinzel font-bold"
              >
                Опубликовать
              </button>
            </form>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  )
}