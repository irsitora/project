const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema(
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
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'appointment',
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    file: {
      type: String,
      required: [true, 'Please provide a file'],
    },
  },
  {
    timestamps: true,
  }
);

// ! --------------------------------

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
