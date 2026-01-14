import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import { Student } from './models/student.js';

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT ?? 3000;

// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);
app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(helmet()); //захист

// GET /students — список усіх студентів
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// GET /students/:studentId — один студент за id
app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

// Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Something went wrong');
// });

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
