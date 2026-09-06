export interface User {
  id: string
  email: string
  password: string
  level: number
  maxLevel: number
  xp: number
  createdAt: string
}

export type Language = 'ru' | 'en' | 'kz'