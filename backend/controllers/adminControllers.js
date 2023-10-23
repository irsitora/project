const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const bcryptjs = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/tokenModel');

// *--------------------------------------
const addDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    experiences,
    fee,
    startDate,
    endDate,
    startTime,
    endTime,
    specialist,
  } = req.body;

  //! validation
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !experiences ||
    !fee ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !specialist
  ) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters. ');
  }

  // ! Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already existed');
  }

  // ! Get UserAgent
  const ua = parser(req.headers['user-agent']);
  const userAgent = [ua.ua];

  // ! ---------------
  // ! Create new User
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
    phone,
    role: 'doctor',
  });
  // ! ----------------

  const experienceArray = experiences;

  // ! Create new Doctor
  const doctor = await Doctor.create({
    userId: user._id,
    name,
    email,
    password,
    phone,
    photo: user.photo,
    experiences: experienceArray,
    fee,
    startDate,
    endDate,
    startTime,
    endTime,
    specialist,
  });

  // ! if user created successfully & SEND to frontend
  if (user && doctor) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res
      .status(201)
      .json({ _id, name, email, phone, bio, photo, role, isVerified });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// * --------------------------------------
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().sort('-createAt').select('-password');
  if (!doctors) {
    res.status(500);
    throw new Error('Something went wrong, please try again');
  }
  res.status(200).json(doctors);
});

// * -------------------------------------
const getDoctor = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  const {
    name,
    email,
    specialist,
    fee,
    experiences,
    startDate,
    endDate,
    startTime,
    endTime,
    phone,
    photo,
    createdAt,
    userId,
    _id,
  } = doctor;
  const user = await User.findById(userId);

  if (doctor && user) {
    const { isVerified } = user;
    res.status(200).json({
      name,
      email,
      phone,
      specialist,
      fee,
      experiences,
      startDate,
      endDate,
      startTime,
      endTime,
      isVerified,
      photo,
      createdAt,
      _id,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// * -------------------------------------
const deleteDoctor = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  console.log(id);
  const { userId } = doctor;
  const user = await User.findById(userId);

  if (doctor && user) {
    await doctor.remove();
    await user.remove();
    res.status(200).json({ message: 'Doctor Account deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

// * -------------------------------------
const updateDoctorShift = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const id = req.params.id;
  const { startDate, endDate, startTime, endTime } = req.body;
  const doctor = await Doctor.findById(id);
  console.log(id);
  console.log(doctor);

  //! validation
  if (!startDate || !endDate || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }

  if (doctor) {
    doctor.startDate = startDate;
    doctor.endDate = endDate;
    doctor.startTime = startTime;
    doctor.endTime = endTime;
    await doctor.save();
    res.status(200).json({ message: `Doctor's work day renewed` });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

module.exports = {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctorShift,
};
