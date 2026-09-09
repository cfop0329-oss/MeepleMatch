'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { t } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { getUserChats, Chat } from '@/lib/mockData'
import { MessageCircle, Users, Clock } from 'lucide-react'
import ChatWindow from '@/components/ChatWindow'

export default function ChatsPage() {
  const { user, loading, lang } = useAuth()
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const loadChats = () => {
    if (user) {
      const userChats = getUserChats(user.id)
      setChats(userChats)
    }
  }

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
    if (user) loadChats()
  }, [user, loading, router])

  // Автообновление списка чатов каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(loadChats, 3000)
    return () => clearInterval(interval)
  }, [user])

  // Слушаем изменения localStorage между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chats' || e.key === 'gameEvents') {
        loadChats()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e2]">
        <div className="text-[#5c5747] text-lg">Загрузка...</div>
      </div>
    )
  }

  // Если выбран чат — показываем окно чата
  if (selectedChat) {
    return (
      <div className="min-h-screen pb-24 bg-[#f3f1e2]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <ChatWindow
            chat={selectedChat}
            onBack={() => {
              setSelectedChat(null)
              loadChats()
            }}
          />
        </div>
        <Navbar />
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
              <MessageCircle className="text-amber-200" size={28} />
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-amber-50">
                  {t('chats', lang)}
                </h1>
                <p className="font-lora text-xs text-amber-200">
                  Обсуждения сборов
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Список чатов */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {chats.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 border-2 border-amber-900/30 text-center shadow-lg">
            <MessageCircle size={64} className="mx-auto text-amber-700/30 mb-4" />
            <p className="font-lora text-lg text-amber-900 mb-2">Пока нет чатов</p>
            <p className="font-lora text-sm text-amber-700 mb-4">
              Присоединись к сбору на странице Объявлений!
            </p>
            <button
              onClick={() => router.push('/events')}
              className="btn-wood px-6 py-2 rounded-lg font-cinzel font-bold inline-flex items-center gap-2"
            >
              Перейти к объявлениям
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1]
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className="w-full bg-white/70 backdrop-blur-lg rounded-xl p-5 border-2 border-amber-900/30 shadow-lg hover:shadow-xl hover:border-amber-900/50 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-amber-50" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-cinzel font-bold text-lg text-amber-950 truncate">
                          {chat.eventName}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-amber-700 flex-shrink-0 ml-2">
                          <Clock size={12} />
                          {lastMessage && new Date(lastMessage.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
                        <Users size={14} />
                        <span className="font-lora">{chat.participants.length} участников</span>
                      </div>
                      {lastMessage && (
                        <p className="font-lora text-sm text-amber-800 truncate">
                          <span className="font-bold">{lastMessage.senderName}:</span> {lastMessage.text}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  )
}