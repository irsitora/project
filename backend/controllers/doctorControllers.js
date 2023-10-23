const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
const multer = require('multer');
const File = require('../models/results');
const path = require('path');

// * ------------------------------------
const getAppointments = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400);
    throw new Error('userId is required!');
  }

  const doctor = await Doctor.findOne({
    userId,
  }).select('-password');

  // ! Find doctor by userId
  const appointments = await Appointment.find({ doctorId: doctor._id }).sort(
    '-createdAt'
  );

  if (!appointments) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json({ appointments, doctor });
});
// * ------------------------------------
const getAppointment = asyncHandler(async (req, res) => {
  const { id, doctorId } = req.query;

  // ! Appointment Id
  if (!id && !doctorId) {
    res.status(400);
    throw new Error('Please add id and patientId');
  }
  // ! Find Doctor first
  const doctor = await Doctor.findOne({ userId: doctorId });
  // ! Find  appointment for the specific doctor and patient
  const appointment = await Appointment.findOne({
    _id: id,
    doctorId: doctor._id,
  }).sort('-createdAt');

  // ! Patient details
  const user = await User.findOne({
    _id: appointment.patientId,
  }).select('-password');

  if (!appointment) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json({ appointment, user });
});

// * ------------------------------------
// * -----Files Upload/Download----------
// * ------------------------------------

const getItems = asyncHandler(async (req, res) => {
  const { appointmentId } = req.query;
  try {
    const items = await File.find({ appointmentId });
    res.status(200).json(items);
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong!');
  }
});
// * ------------------------------------
const getItem = asyncHandler(async (req, res) => {
  const { id, doctorId } = req.query;
  try {
    const item = await File.findOne({ _id: id, doctorId });
    res.status(200).json(item);
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong!');
  }
});
// * ------------------------------------
const addItem = asyncHandler(async (req, res) => {
  const { doctorId, patientId, name, appointmentId } = req.body;
  console.log(req.file);
  const file = req.file.path;

  if (!doctorId && !patientId && !name && !file) {
    res.status(404);
    throw new Error('Please fill all fields');
  }
  const item = await File.create({
    name,
    file,
    doctorId,
    patientId,
    appointmentId,
  });
  if (item) {
    res.status(201).json({ item });
  } else {
    res.status(400);
    throw new Error('File is not uploaded');
  }
});
// * ------------------------------------
const downloadFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await File.findById(id);
  if (!item) {
    res.status(404);
    throw new Error('File not found');
  }
  const file = item.file;
  const filePath = path.join(__dirname, `../${file}`);
  res.download(filePath);
});
// * ------------------------------------
const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await File.findByIdAndDelete(id);
  if (!item) {
    res.status(404);
    throw new Error('File not found');
  }

  if (item) {
    res.status(200).json({
      message: 'File deleted successfully',
    });
  } else {
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = {
  getAppointments,
  getAppointment,
  getItems,
  addItem,
  downloadFile,
  deleteFile,
  getItem,
};
