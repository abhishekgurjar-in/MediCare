import express from "express";
import { getAllUsers, getSingleUser, deleteUser, updateUser, getUserProfile, getMyAppointments } from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.get('/:id',authenticate,restrict(['patient']), getSingleUser); // Get a single user by ID
router.get('/',authenticate,restrict(['admin']), getAllUsers); // Get all users
router.put('/:id',authenticate,restrict(['patient']), updateUser); // Update a user by ID
router.delete('/:id',authenticate,restrict(['patient']), deleteUser); // Delete a user by ID
router.get('/profile/me', authenticate, restrict(['patient']), getUserProfile); // Get patient profile
router.get('/appointments/my-appointments', authenticate, restrict(['patient']), getMyAppointments); // Get appointments of patient

export default router;
