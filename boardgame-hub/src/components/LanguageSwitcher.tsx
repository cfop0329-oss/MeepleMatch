'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useAuth()

  return (
    <div className="flex gap-1 bg-gray-200/80 backdrop-blur-sm rounded-lg p-1 border border-gray-300/50">
      {(['ru', 'en', 'kz'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            lang === l
              ? 'bg-gray-600 text-white shadow-sm'
              : 'bg-gray-300/50 text-gray-700 hover:bg-gray-400/50 hover:text-gray-900'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}