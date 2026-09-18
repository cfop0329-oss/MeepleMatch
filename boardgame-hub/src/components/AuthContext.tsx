'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'http://localhost:3001/api'

interface User {
  id: number
  name: string
  email: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  lang: string // Оставляем для совместимости с твоим кодом
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const lang = 'ru' // Пока захардкодим, можно подключить твою i18n позже

  useEffect(() => {
    refreshUser()
  }, [])

  const refreshUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      } else {
        localStorage.removeItem('token')
        setUser(null)
      }
    } catch (error) {
      console.error('Ошибка получения пользователя:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Ошибка входа')

    localStorage.setItem('token', data.token)
    setUser(data.user)
    router.push('/profile')
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Ошибка регистрации')

    localStorage.setItem('token', data.token)
    setUser(data.user)
    router.push('/profile')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, lang }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}