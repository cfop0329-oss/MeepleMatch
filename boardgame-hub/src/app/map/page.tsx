'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import dynamic from 'next/dynamic'
import { MapPin, Megaphone } from 'lucide-react'

// Динамический импорт карты с отключенным SSR
const MapComponent = dynamic(() => import('@/components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-amber-100/50 rounded-2xl flex items-center justify-center">
      <div className="text-amber-900 font-lora">Загрузка карты...</div>
    </div>
  ),
})

export default function MapPage() {
  const { user, loading, lang } = useAuth()
  const router = useRouter()

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
                onClick={() => router.push('/events')}
                className="btn-wood px-4 py-2 rounded-lg font-cinzel font-bold text-sm flex items-center gap-2"
              >
                <Megaphone size={16} />
                Объявления
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

      <Navbar />
    </div>
  )
}