'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useAuth()

  return (
    <div className="flex gap-1 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700 rounded-lg p-1 border-2 border-yellow-900 shadow-lg">
      {(['ru', 'en', 'kz'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded text-xs font-bold transition-all font-cinzel ${
            lang === l
              ? 'bg-amber-900 text-amber-50 shadow-inner'
              : 'bg-yellow-600/50 text-yellow-100 hover:bg-yellow-500/50'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}