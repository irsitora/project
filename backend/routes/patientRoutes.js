const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const {
  bookAppointment,
  checkAvailability,
  getAppointments,
  getAppointment,
  deleteAppointment,
} = require('../controllers/patientControllers');
const router = express.Router();

router.post('/allDoctors/:id', protect, patientOnly, bookAppointment);
router.get(
  '/allDoctors/check-booking-availability',
  protect,
  patientOnly,
  checkAvailability
);

router.get('/allDoctors/history', protect, patientOnly, getAppointments);

router.get(
  '/allDoctors/history/appointment',
  protect,
  patientOnly,
  getAppointment
);

router.delete(
  '/allDoctors/history/appointment/:id',
  protect,
  patientOnly,
  deleteAppointment
);

module.exports = router;
