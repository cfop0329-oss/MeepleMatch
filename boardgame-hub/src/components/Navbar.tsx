'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Map, Megaphone, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { t } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const { lang } = useAuth()

  const links = [
    { href: '/chats', icon: MessageCircle, label: t('chats', lang) },
    { href: '/map', icon: Map, label: t('map', lang) },
    { href: '/events', icon: Megaphone, label: t('events', lang) },
    { href: '/profile', icon: User, label: t('profile', lang) },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-lg mx-auto flex justify-around py-3">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${
              pathname === href
                ? 'text-purple-400'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}