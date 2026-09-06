import { Language } from '@/types'

const translations = {
  ru: {
    chats: 'Чаты',
    map: 'Карта',
    events: 'Объявления',
    profile: 'Профиль',
    level: 'Уровень',
    login: 'Войти',
    register: 'Зарегистрироваться',
    email: 'Почта',
    password: 'Пароль',
    logout: 'Выйти',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Уже есть аккаунт?',
    profileData: 'Данные профиля',
  },
  en: {
    chats: 'Chats',
    map: 'Map',
    events: 'Events',
    profile: 'Profile',
    level: 'Level',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    profileData: 'Profile Data',
  },
  kz: {
    chats: 'Чаттар',
    map: 'Карта',
    events: 'Хабарландырулар',
    profile: 'Профиль',
    level: 'Деңгей',
    login: 'Кіру',
    register: 'Тіркелу',
    email: 'Пошта',
    password: 'Құпия сөз',
    logout: 'Шығу',
    noAccount: 'Аккаунт жоқ па?',
    hasAccount: 'Аккаунт бар ма?',
    profileData: 'Профиль деректері',
  },
}

export const t = (key: string, lang: Language = 'ru') => {
  return translations[lang][key as keyof typeof translations['ru']] || key
}