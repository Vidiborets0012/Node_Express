import { Router } from 'express';
// import { Student } from '../models/student.js';
import {
  getStudents,
  getStudentById,
} from '../controllers/studentsController.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:studentId', getStudentById);

// // GET /students — список усіх студентів
// router.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// // GET /students/:studentId — один студент за id
// router.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json(student);
// });

export default router;
