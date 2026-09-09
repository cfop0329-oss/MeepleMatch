'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Megaphone, MapPin, Clock, Users, Trash2, UserPlus, Plus, X } from 'lucide-react'
import { getEvents, joinEvent, deleteEvent, saveEvent, GameEvent } from '@/lib/mockData'

export default function EventsPage() {
  const { user, loading, lang } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<GameEvent[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    gameName: '',
    playersNeeded: '',
    time: '',
    location: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
    if (user) loadEvents()
  }, [user, loading, router])

  const loadEvents = () => {
    const savedEvents = getEvents()
    setEvents(savedEvents)
  }

  const handleJoin = (eventId: string) => {
    const updatedEvent = joinEvent(eventId)
    if (updatedEvent) {
      loadEvents()
      alert('Вы присоединились к сбору!')
    }
  }

  const handleDelete = (eventId: string) => {
    if (confirm('Удалить этот сбор?')) {
      deleteEvent(eventId)
      loadEvents()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    // Координаты для примера (центр Алматы)
    const lat = 43.238949 + (Math.random() - 0.5) * 0.02
    const lng = 76.945465 + (Math.random() - 0.5) * 0.02

    try {
      saveEvent({
        gameId: Date.now().toString(),
        gameName: formData.gameName,
        playersNeeded: parseInt(formData.playersNeeded),
        time: formData.time,
        location: formData.location,
        lat,
        lng,
        creatorId: user.id,
        creatorName: user.email.split('@')[0],
      })

      // Очистить форму и закрыть
      setFormData({
        gameName: '',
        playersNeeded: '',
        time: '',
        location: '',
      })
      setShowForm(false)
      loadEvents()
      alert('Сбор успешно создан!')
    } catch (error) {
      alert('Ошибка при создании сбора')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Megaphone className="text-amber-200" size={28} />
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-amber-50">
                  {t('events', lang)}
                </h1>
                <p className="font-lora text-xs text-amber-200">
                  Активные сборы на игры
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setShowForm(true)}
                className="btn-wood px-4 py-2 rounded-lg font-cinzel font-bold text-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Создать сбор
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список событий */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {events.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 border-2 border-amber-900/30 text-center shadow-lg">
            <Megaphone size={64} className="mx-auto text-amber-700/30 mb-4" />
            <p className="font-lora text-lg text-amber-900 mb-2">Пока нет объявлений</p>
            <p className="font-lora text-sm text-amber-700 mb-4">
              Создай первый сбор!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-wood px-6 py-2 rounded-lg font-cinzel font-bold inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Создать сбор
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/70 backdrop-blur-lg rounded-xl p-5 border-2 border-amber-900/30 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-amber-950 mb-1">
                      {event.gameName}
                    </h3>
                    <p className="font-lora text-sm text-amber-700">
                      Создал: {event.creatorName}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 border border-green-700/30 rounded-full text-xs font-bold text-green-800">
                    Активен
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-amber-900">
                    <MapPin size={16} className="text-amber-700" />
                    <span className="font-lora">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-900">
                    <Clock size={16} className="text-amber-700" />
                    <span className="font-lora">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-900 col-span-2">
                    <Users size={16} className="text-amber-700" />
                    <span className="font-lora">
                      Нужно: {event.playersNeeded} • Присоединилось: {event.playersJoined}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleJoin(event.id)}
                    disabled={event.playersJoined >= event.playersNeeded}
                    className="flex-1 bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50 py-2.5 rounded-lg font-cinzel font-bold text-sm hover:from-amber-600 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <UserPlus size={16} />
                    {event.playersJoined >= event.playersNeeded ? 'Мест нет' : 'Присоединиться'}
                  </button>
                  
                  {event.creatorId === user.id && (
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2.5 bg-red-100 border-2 border-red-700/30 text-red-800 rounded-lg font-cinzel font-bold text-sm hover:bg-red-200 transition-all flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно создания сбора */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 max-w-md w-full border-4 border-amber-900 shadow-2xl relative">
            <button
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
              className="absolute top-3 right-3 text-amber-900 hover:text-amber-950 text-2xl font-bold disabled:opacity-50"
            >
              <X size={24} />
            </button>
            
            <h2 className="font-cinzel text-2xl font-bold text-amber-950 mb-4">
              Создать сбор
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Игра *
                </label>
                <input
                  type="text"
                  value={formData.gameName}
                  onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                  placeholder="Например: D&D 5e"
                  required
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Сколько игроков нужно *
                </label>
                <input
                  type="number"
                  value={formData.playersNeeded}
                  onChange={(e) => setFormData({ ...formData, playersNeeded: e.target.value })}
                  placeholder="2"
                  min="1"
                  max="10"
                  required
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Когда *
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="Сегодня, 19:00"
                  required
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              
              <div>
                <label className="block font-lora text-sm font-medium text-amber-900 mb-1">
                  Где *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Dice & Coffee, ул. Абая 52"
                  required
                  className="input-embossed w-full px-3 py-2 rounded font-lora text-sm"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-lg font-cinzel font-bold text-amber-900 bg-white/50 hover:bg-white/70 border-2 border-amber-900/30 transition-all disabled:opacity-50"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-wood flex-1 py-3 rounded font-cinzel font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Публикация...' : 'Опубликовать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  )
}