'use client'; // Обязательно для Next.js

import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api";

export default function TestDbPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch(`${API_URL}/sessions`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Не удалось загрузить:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestGame = async () => {
    try {
      await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Тестовая игра",
          gameName: "Колонизаторы",
          maxPlayers: 4,
          latitude: 51.1694,
          longitude: 71.4491,
          location: "Парк Горького",
          scheduledAt: new Date().toISOString(),
          hostId: 1, // ID пользователя из Prisma Studio
        }),
      });
      await loadSessions();
      alert("Игра успешно сохранена в PostgreSQL! 🎲");
    } catch (error) {
      alert("Ошибка при сохранении");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-600">Загрузка данных из БД...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8 border-4 border-green-500">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          🗄️ Тест подключения к PostgreSQL
        </h1>
        
        <div className="text-center mb-6">
          <button 
            onClick={handleAddTestGame} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200"
          >
            ➕ Добавить тестовую игру в БД
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Игры в базе данных ({sessions.length}):
          </h2>
          
          {sessions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Пока нет игр. Нажми кнопку выше, чтобы создать первую!
            </p>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s: any) => (
                <li key={s.id} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{s.title}</h3>
                      <p className="text-gray-600">🎮 {s.gameName}</p>
                      <p className="text-gray-600"> {s.location}</p>
                      <p className="text-sm text-gray-500">
                        👥 {s.maxPlayers} игроков | 
                        📅 {new Date(s.scheduledAt).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    {s.host && (
                      <div className="text-right text-sm text-gray-500">
                        <p>Ведущий: {s.host.name}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Бэкенд: http://localhost:3001</p>
          <p>База данных: PostgreSQL 17</p>
        </div>
      </div>
    </main>
  );
}