const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'doctor',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// ! --------------------------------

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
