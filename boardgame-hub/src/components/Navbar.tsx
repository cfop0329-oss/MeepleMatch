'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Map, Megaphone, User, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'
import { getUserChats } from '@/lib/mockData'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { user, lang } = useAuth()
  const [chatCount, setChatCount] = useState(0)

  useEffect(() => {
    if (user) {
      const chats = getUserChats(user.id)
      setChatCount(chats.length)
    }
  }, [user])

  const links = [
    { href: '/chats', icon: MessageCircle, label: t('chats', lang), badge: chatCount },
    { href: '/map', icon: Map, label: t('map', lang) },
    { href: '/events', icon: Megaphone, label: t('events', lang) },
    { href: '/profile', icon: User, label: t('profile', lang) },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Основной фон с градиентом и тенью */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-900 to-amber-800/95 backdrop-blur-xl" />
      
      {/* Декоративная верхняя граница */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      {/* Внутренний контент */}
      <div className="relative max-w-lg mx-auto px-4 py-3">
        {/* Деревянная рамка сверху */}
        <div className="absolute -top-1 left-4 right-4 h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-t-lg" />
        
        <div className="flex justify-around items-center gap-2">
          {links.map(({ href, icon: Icon, label, badge }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl 
                  transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gradient-to-b from-amber-600 to-amber-800 shadow-lg shadow-amber-900/50 scale-110' 
                    : 'hover:bg-amber-800/50 hover:scale-105'
                  }
                `}
              >
                {/* Свечение для активной вкладки */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent rounded-xl blur-md" />
                )}
                
                {/* Иконка с анимацией */}
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon 
                    size={24} 
                    className={isActive ? 'text-amber-100' : 'text-amber-700/70 group-hover:text-amber-600'} 
                  />
                  
                  {/* Бейдж уведомлений */}
                  {badge !== undefined && badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-700 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border-2 border-amber-900 animate-pulse">
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </div>
                
                {/* Текст */}
                <span className={`
                  relative z-10 text-[10px] font-cinzel font-bold transition-colors duration-300
                  ${isActive ? 'text-amber-100' : 'text-amber-700/70 group-hover:text-amber-600'}
                `}>
                  {label}
                </span>
                
                {/* Индикатор активности снизу */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 rounded-full shadow-lg" />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Декоративные элементы по бокам */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 border-l-2 border-b-2 border-amber-600/50 rounded-bl-lg" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-r-2 border-b-2 border-amber-600/50 rounded-br-lg" />
      </div>
      
      {/* Нижняя тень для объема */}
      <div className="absolute -bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-black/30 to-transparent" />
    </nav>
  )
}