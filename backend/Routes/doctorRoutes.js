import express from 'express';
import {
  getAllDoctors,
  getSingleDoctor,
  deleteDoctor,
  updateDoctor,
  getDoctorProfile,
} from '../Controllers/doctorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRouter from './reviewRoutes.js';

const router = express.Router();

// Nested Route for Review
router.use('/:doctorId/reviews', reviewRouter);

// Route to get a single doctor by ID
router.get('/:id', getSingleDoctor);

// Route to get all doctors
router.get('/', getAllDoctors);

// Route to update a doctor by ID
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);

// Route to delete a doctor by ID
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

//Route to get profile and appointments
router.get('/profile/me',authenticate,restrict(['doctor']),getDoctorProfile)
export default router;
