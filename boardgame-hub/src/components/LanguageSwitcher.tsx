'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useAuth()

  return (
    <div className="flex gap-1 bg-white/10 rounded-lg p-1">
      {(['ru', 'en', 'kz'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 rounded text-xs font-bold transition-all ${
            lang === l
              ? 'bg-purple-500 text-white'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}