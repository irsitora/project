const express = require('express');
const router = express.Router();
const {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctorShift,
} = require('../controllers/adminControllers');
const {
  protect,
  adminOnly,
  patientOnly,
  adminOrPatient,
} = require('../middleware/AuthMiddleware');

router.post('/addDoctor', protect, adminOnly, addDoctor);
router.get('/getDoctors', protect, adminOrPatient, getDoctors);
// TODO LATER
// ! may be I don't need protect here but I am not sure
router.get('/getDoctors/:id', protect, adminOrPatient, getDoctor);
router.delete('/getDoctors/:id', protect, adminOnly, deleteDoctor);
router.patch('/getDoctors/:id', protect, adminOnly, updateDoctorShift);

module.exports = router;
