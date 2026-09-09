'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, getCurrentUser, logout as logoutUser } from '@/lib/auth'
import { Language } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  refreshUser: () => void // <-- ДОБАВИЛИ ЭТО
  lang: Language
  setLang: (lang: Language) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: () => {}, // <-- ДОБАВИЛИ ЭТО
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

  // <-- ДОБАВИЛИ ЭТУ ФУНКЦИЮ
  const refreshUser = () => {
    setUser(getCurrentUser())
  }

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout: handleLogout, refreshUser, lang, setLang: handleSetLang }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)