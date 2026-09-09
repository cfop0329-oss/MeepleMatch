export interface Place {
  id: string
  name: string
  type: 'club' | 'anticafe' | 'shop'
  lat: number
  lng: number
  address: string
  rating: number
  games: string[]
  description: string
}

export interface PlayerMarker {
  id: string
  name: string
  level: number
  lat: number
  lng: number
  game: string
  playersNeeded: number
  time: string
  avatar: string
}

export interface GameEvent {
  id: string
  gameId: string
  gameName: string
  playersNeeded: number
  playersJoined: number
  time: string
  location: string
  lat: number
  lng: number
  creatorId: string
  creatorName: string
  createdAt: string
  status: 'active' | 'completed' | 'cancelled'
}

// Клубы и антикафе Алматы
export const places: Place[] = [
  {
    id: '1',
    name: 'Dice & Coffee',
    type: 'anticafe',
    lat: 43.238949,
    lng: 76.945465,
    address: 'ул. Абая 52',
    rating: 4.8,
    games: ['D&D', 'Pathfinder', 'Gloomhaven'],
    description: 'Уютное антикафе с коллекцией 200+ настолок',
  },
  {
    id: '2',
    name: 'Meeple Club',
    type: 'club',
    lat: 43.251234,
    lng: 76.928765,
    address: 'пр. Достык 118',
    rating: 4.9,
    games: ['Catan', 'Ticket to Ride', 'Carcassonne'],
    description: 'Клуб настольных игр с мастерами',
  },
  {
    id: '3',
    name: 'Dragon Tavern',
    type: 'club',
    lat: 43.225678,
    lng: 76.912345,
    address: 'ул. Жандосова 35',
    rating: 4.7,
    games: ['Warhammer', 'D&D', 'Magic'],
    description: 'Таверна для ролевых и стратегических игр',
  },
  {
    id: '4',
    name: 'Board Game Cafe',
    type: 'anticafe',
    lat: 43.240123,
    lng: 76.950987,
    address: 'ул. Толе Би 77',
    rating: 4.6,
    games: ['Codenames', 'Dixit', 'Alias'],
    description: 'Семейное антикафе с детскими играми',
  },
  {
    id: '5',
    name: 'Geek Space',
    type: 'club',
    lat: 43.232456,
    lng: 76.935678,
    address: 'ул. Сатпаева 22',
    rating: 4.8,
    games: ['Terraforming Mars', 'Scythe', 'Wingspan'],
    description: 'Клуб для хардкорных стратегов',
  },
]

// Игроки, которые ищут компанию
export const players: PlayerMarker[] = [
  {
    id: 'p1',
    name: 'Арман',
    level: 840,
    lat: 43.239500,
    lng: 76.946000,
    game: 'D&D 5e',
    playersNeeded: 2,
    time: 'Сегодня, 19:00',
    avatar: '',
  },
  {
    id: 'p2',
    name: 'Айгерим',
    level: 620,
    lat: 43.250800,
    lng: 76.929200,
    game: 'Catan',
    playersNeeded: 3,
    time: 'Завтра, 15:00',
    avatar: '',
  },
  {
    id: 'p3',
    name: 'Данияр',
    level: 1200,
    lat: 43.226100,
    lng: 76.913000,
    game: 'Warhammer 40k',
    playersNeeded: 1,
    time: 'Суббота, 12:00',
    avatar: '',
  },
  {
    id: 'p4',
    name: 'Мадина',
    level: 450,
    lat: 43.240500,
    lng: 76.951500,
    game: 'Codenames',
    playersNeeded: 4,
    time: 'Пятница, 18:00',
    avatar: '',
  },
  {
    id: 'p5',
    name: 'Ерлан',
    level: 980,
    lat: 43.233000,
    lng: 76.936200,
    game: 'Terraforming Mars',
    playersNeeded: 2,
    time: 'Воскресенье, 14:00',
    avatar: '',
  },
]

// Функции для работы с событиями
export const getEvents = (): GameEvent[] => {
  if (typeof window === 'undefined') return []
  const events = localStorage.getItem('gameEvents')
  return events ? JSON.parse(events) : []
}

export const saveEvent = (event: Omit<GameEvent, 'id' | 'createdAt' | 'status' | 'playersJoined'>) => {
  const events = getEvents()
  const newEvent: GameEvent = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'active',
    playersJoined: 0,
  }
  events.push(newEvent)
  localStorage.setItem('gameEvents', JSON.stringify(events))
  return newEvent
}

export const deleteEvent = (eventId: string) => {
  const events = getEvents()
  const filtered = events.filter(e => e.id !== eventId)
  localStorage.setItem('gameEvents', JSON.stringify(filtered))
}

export const joinEvent = (eventId: string) => {
  const events = getEvents()
  const event = events.find(e => e.id === eventId)
  if (event) {
    event.playersJoined += 1
    localStorage.setItem('gameEvents', JSON.stringify(events))
    return event
  }
  return null
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  senderName: string
  text: string
  createdAt: string
}

export interface Chat {
  id: string
  eventId: string
  eventName: string
  participants: string[] // id пользователей
  messages: Message[]
  createdAt: string
}

// Получить все чаты
export const getChats = (): Chat[] => {
  if (typeof window === 'undefined') return []
  const chats = localStorage.getItem('chats')
  return chats ? JSON.parse(chats) : []
}

// Сохранить чаты
export const saveChats = (chats: Chat[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('chats', JSON.stringify(chats))
}

// Создать чат при присоединении к событию
export const createChatForEvent = (eventId: string, eventName: string, userId: string, userName: string): Chat | null => {
  const chats = getChats()
  
  // Проверяем, есть ли уже чат для этого события
  const existingChat = chats.find(c => c.eventId === eventId)
  if (existingChat) {
    // Добавляем пользователя если его нет
    if (!existingChat.participants.includes(userId)) {
      existingChat.participants.push(userId)
      saveChats(chats)
    }
    return existingChat
  }

  // Создаём новый чат
  const newChat: Chat = {
    id: `chat_${Date.now()}`,
    eventId,
    eventName,
    participants: [userId],
    messages: [
      {
        id: `msg_${Date.now()}`,
        chatId: `chat_${Date.now()}`,
        senderId: userId,
        senderName: userName,
        text: `Чат создан для сбора "${eventName}"`,
        createdAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
  }

  chats.push(newChat)
  saveChats(chats)
  return newChat
}

// Получить чаты пользователя
export const getUserChats = (userId: string): Chat[] => {
  const chats = getChats()
  return chats.filter(c => c.participants.includes(userId))
}

// Отправить сообщение
export const sendMessage = (chatId: string, senderId: string, senderName: string, text: string): Message | null => {
  const chats = getChats()
  const chat = chats.find(c => c.id === chatId)
  
  if (!chat) return null

  const newMessage: Message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    chatId,
    senderId: senderId,      // ← важно: сохраняем ID отправителя
    senderName: senderName,  // ← важно: сохраняем имя отправителя
    text,
    createdAt: new Date().toISOString(),
  }

  chat.messages.push(newMessage)
  saveChats(chats)
  return newMessage
}

// Обновить joinEvent чтобы создавал чат
export const joinEventWithChat = (eventId: string, userId: string, userName: string) => {
  const events = getEvents()
  const event = events.find(e => e.id === eventId)
  
  if (event) {
    event.playersJoined += 1
    localStorage.setItem('gameEvents', JSON.stringify(events))
    
    // Создаём чат
    createChatForEvent(eventId, event.gameName, userId, userName)
    
    return event
  }
  return null
}