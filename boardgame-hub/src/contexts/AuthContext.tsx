'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getCurrentUser, logout as logoutUser } from '@/lib/auth'
import { Language, User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  lang: Language
  setLang: (lang: Language) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  lang: 'ru',
  setLang: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<Language>('ru')

  useEffect(() => {
    setUser(getCurrentUser())
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    setLoading(false)
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout: handleLogout, lang, setLang: handleSetLang }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)