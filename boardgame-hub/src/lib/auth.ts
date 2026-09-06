import { User } from '@/types'

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return []
  const users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

export const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('users', JSON.stringify(users))
}

export const register = (email: string, password: string) => {
  const users = getUsers()

  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь уже существует' }
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    level: 840,
    maxLevel: 1000,
    xp: 840,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)
  localStorage.setItem('currentUser', JSON.stringify(newUser))

  return { success: true, user: newUser }
}

export const login = (email: string, password: string) => {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: 'Неверная почта или пароль' }
  }

  localStorage.setItem('currentUser', JSON.stringify(user))
  return { success: true, user }
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

export const logout = () => {
  localStorage.removeItem('currentUser')
}