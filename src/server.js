import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

// import { Student } from './models/student.js';

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors()); // 3. Дозвіл для запитів з інших доменів
app.use(helmet()); //захист

// // GET /students — список усіх студентів
// app.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// // GET /students/:studentId — один студент за id
// app.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json(student);
// });

// підключаємо групу маршрутів студента
app.use(studentsRoutes);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
