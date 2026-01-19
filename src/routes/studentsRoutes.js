import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';
import { createStudentSchema } from '../validations/studentsValidation.js';

const router = Router();

router.get('/students', getStudents);
router.get('/students/:studentId', getStudentById);
router.post('/students', celebrate(createStudentSchema), createStudent);
router.delete('/students/:studentId', deleteStudent);
router.patch('/students/:studentId', updateStudent);

export default router;
