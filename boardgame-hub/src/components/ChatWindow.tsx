'use client'

import { useState, useEffect, useRef } from 'react'
import { Chat, sendMessage, getChats } from '@/lib/mockData'
import { useAuth } from '@/contexts/AuthContext'
import { Send, ArrowLeft } from 'lucide-react'

interface ChatWindowProps {
  chat: Chat
  onBack: () => void
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const { user } = useAuth()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<Chat['messages']>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ВСЕГДА загружаем свежие сообщения из localStorage
  const loadFreshMessages = () => {
    const allChats = getChats()
    const currentChat = allChats.find(c => c.id === chat.id)
    if (currentChat) {
      setMessages(currentChat.messages)
    }
  }

  // Загружаем сообщения при монтировании
  useEffect(() => {
    loadFreshMessages()
  }, [chat.id])

  // Polling каждые 1.5 секунды
  useEffect(() => {
    const interval = setInterval(loadFreshMessages, 1500)
    return () => clearInterval(interval)
  }, [chat.id])

  // Слушаем изменения localStorage между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chats') {
        loadFreshMessages()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [chat.id])

  // Автоскролл вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !user) return

    const newMessage = sendMessage(
      chat.id,
      user.id,
      user.email.split('@')[0],
      messageText
    )
    if (newMessage) {
      loadFreshMessages() // Сразу обновляем после отправки
      setMessageText('')
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
  }

  // Получаем инициалы имени
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  // Цвета аватаров (детерминированные по имени)
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-amber-700 to-amber-900',
      'from-red-700 to-red-900',
      'from-blue-700 to-blue-900',
      'from-green-700 to-green-900',
      'from-purple-700 to-purple-900',
      'from-teal-700 to-teal-900',
    ]
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-4 border-amber-900 shadow-2xl flex flex-col h-[600px]">
      {/* Шапка чата */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 p-4 rounded-t-lg flex items-center gap-3 border-b-4 border-amber-950">
        <button
          onClick={onBack}
          className="text-amber-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h3 className="font-cinzel font-bold text-amber-50 text-lg">
            {chat.eventName}
          </h3>
          <p className="font-lora text-xs text-amber-200">
            Участников: {chat.participants.length}
          </p>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-amber-50/50">
        {messages.length === 0 && (
          <div className="text-center text-amber-700/50 font-lora text-sm py-8">
            Нет сообщений
          </div>
        )}

        {messages.map((msg, index) => {
          const isMe = user && msg.senderId === user.id
          const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId

          return (
            <div key={msg.id}>
              {/* Дата-разделитель */}
              {index === 0 && (
                <div className="text-center my-4">
                  <span className="bg-amber-200/50 text-amber-800 text-xs px-3 py-1 rounded-full font-lora">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              )}

              <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mt-3' : 'mt-1'}`}>
                {/* Аватар собеседника */}
                {!isMe && showAvatar && (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.senderName)} flex items-center justify-center flex-shrink-0 mr-2 self-end`}>
                    <span className="text-white text-xs font-bold font-cinzel">
                      {getInitials(msg.senderName)}
                    </span>
                  </div>
                )}
                {!isMe && !showAvatar && <div className="w-8 mr-2 flex-shrink-0" />}

                <div className={`max-w-[70%]`}>
                  {/* Имя отправителя (только для собеседника и только первое сообщение в группе) */}
                  {!isMe && showAvatar && (
                    <div className="font-cinzel font-bold text-xs text-amber-800 mb-1 ml-1">
                      {msg.senderName}
                    </div>
                  )}

                  <div
                    className={`rounded-xl px-4 py-2 shadow-md ${
                      isMe
                        ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-50 rounded-br-sm'
                        : 'bg-white border-2 border-amber-900/30 text-amber-950 rounded-bl-sm'
                    }`}
                  >
                    <div className="font-lora text-sm break-words">{msg.text}</div>
                  </div>

                  <div className={`text-[10px] mt-1 font-lora ${
                    isMe ? 'text-right text-amber-700 mr-1' : 'text-amber-700 ml-1'
                  }`}>
                    {formatTime(msg.createdAt)}
                  </div>
                </div>

                {/* Мой аватар */}
                {isMe && showAvatar && (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.senderName)} flex items-center justify-center flex-shrink-0 ml-2 self-end`}>
                    <span className="text-white text-xs font-bold font-cinzel">
                      {getInitials(msg.senderName)}
                    </span>
                  </div>
                )}
                {isMe && !showAvatar && <div className="w-8 ml-2 flex-shrink-0" />}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Форма отправки */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-amber-100 border-t-2 border-amber-900/30 flex gap-2"
      >
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Написать сообщение..."
          className="input-embossed flex-1 px-4 py-2 rounded-lg font-lora text-sm"
        />
        <button
          type="submit"
          className="btn-wood px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}