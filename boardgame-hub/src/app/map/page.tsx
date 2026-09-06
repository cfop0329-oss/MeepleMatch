'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import { MapPin } from 'lucide-react'

export default function MapPage() {
  const { user, loading, lang } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  if (loading || !user) return null

  return (
    <div className="min-h-screen pb-24 p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">{t('map', lang)}</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
          <MapPin size={48} className="mx-auto text-white/30 mb-4" />
          <p className="text-white/50">Карта скоро будет здесь</p>
          <p className="text-white/30 text-sm mt-1">2GIS / Yandex Maps</p>
        </div>
      </div>
      <Navbar />
    </div>
  )
}