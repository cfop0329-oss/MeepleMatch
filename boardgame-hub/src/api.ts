// Адрес твоего бэкенд-сервера
const API_URL = "http://localhost:3001/api";

// Функция для получения всех игр
export async function getSessions() {
  const response = await fetch(`${API_URL}/sessions`);
  if (!response.ok) throw new Error("Ошибка загрузки сессий");
  return response.json();
}

// Функция для создания новой игры
export async function createSession(data: {
  title: string;
  gameName: string;
  maxPlayers: number;
  latitude: number;
  longitude: number;
  location: string;
  scheduledAt: string;
}) {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      hostId: 1, // ID Санжара, которого мы создали в Prisma Studio
    }),
  });
  if (!response.ok) throw new Error("Ошибка создания сессии");
  return response.json();
}