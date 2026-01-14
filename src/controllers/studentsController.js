import { Student } from '../models/student.js';
import createHttpError from 'http-errors';

// Отримати список усіх студентів
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

// Отримати одного студента за id
export const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  // if (!student) {
  //   return res.status(404).json({ message: 'Student not found' });
  // }

  // Додаємо базову обробку помилки замість res.status(404)
  if (!student) {
    // next(new Error('Student not found'));
    next(createHttpError('Student not found'));
    return;
  }

  res.status(200).json(student);
};
