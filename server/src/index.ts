import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Инициализируем Express и Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Разрешаем фронтенду делать запросы к этому серверу и принимаем JSON
app.use(cors());
app.use(express.json());

// 1. Тестовый роут (проверка, что сервер жив)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "MeepleMatch сервер работает! 🎲" });
});

// 2. Получить все игровые сессии (места/встречи)
app.get("/api/sessions", async (req, res) => {
  try {
    const sessions = await prisma.gameSession.findMany({
      include: { 
        host: { select: { id: true, name: true, email: true } },
        participants: true 
      },
      orderBy: { scheduledAt: "asc" },
    });
    res.json(sessions);
    console.log("✅ Получен список сессий");
  } catch (error) {
    console.error("❌ Ошибка при получении сессий:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

// 3. Создать новую игровую сессию
app.post("/api/sessions", async (req, res) => {
  try {
    const { title, description, gameName, maxPlayers, latitude, longitude, location, scheduledAt, hostId } = req.body;

    const newSession = await prisma.gameSession.create({
      data: {
        title,
        description: description || "",
        gameName,
        maxPlayers: Number(maxPlayers),
        latitude: Number(latitude),
        longitude: Number(longitude),
        location,
        scheduledAt: new Date(scheduledAt),
        hostId: Number(hostId), // Пока ставим 1, потом сделаем авторизацию
      },
    });
    
    res.status(201).json(newSession);
    console.log("✅ Новая сессия создана:", newSession.title);
  } catch (error) {
    console.error(" Ошибка при создании сессии:", error);
    res.status(500).json({ error: "Не удалось создать сессию" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`🗄️ Подключение к базе данных: PostgreSQL`);
});