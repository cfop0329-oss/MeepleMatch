'use client'; // Обязательно для Next.js, так как мы используем хуки

import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api";

export default function TestDb() {
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

  if (loading) return <p className="text-gray-500">Загрузка данных из БД...</p>;

  return (
    <div className="p-6 border-2 border-green-500 rounded-lg m-4 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">️ Тест подключения к PostgreSQL</h2>
      <button 
        onClick={handleAddTestGame} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        ➕ Добавить тестовую игру в БД
      </button>

      <h3 className="text-xl font-semibold mt-4">Игры в базе данных ({sessions.length}):</h3>
      <ul className="list-disc pl-5 mt-2">
        {sessions.map((s: any) => (
          <li key={s.id} className="mb-1">
            <strong>{s.title}</strong> ({s.gameName}) — {s.location}
          </li>
        ))}
      </ul>
    </div>
  );
}