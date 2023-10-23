const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// ! +++++++++++++++++++++++++++++++++++++++++
const protect = asyncHandler(async (req, res, next) => {
  try {
    // ! Check for token
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error('Not Authorized, please login or register');
    }
    // ! Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // ! Get user id from token
    const user = await User.findById(verified.id).select('-password');
    // ! User not  found
    if (!user) {
      req.status(401);
      throw new Error('User not found');
    }
    // ! If User suspended
    if (user.role === 'suspended') {
      res.status(400);
      throw new Error('User suspended, please contact for support');
    }
    // ! req.user we use UserControllers
    req.user = user;
    // ! ------------------------------
    next();
  } catch (error) {
    res.status(400);
    throw new Error('Not Authorized, Please Login');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log(req.user);
    next();
  } else {
    res.status(401);
    throw new Error('Your are not authorized as an admin');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++

const authorOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'author' || req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Your are not authorized as an author');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++
const adminOrPatient = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'patient' || req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Your are not allowed to do this action');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++
const doctorOrPatient = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'patient' || req.user.role === 'doctor') {
    next();
  } else {
    res.status(401);
    throw new Error('Your are not allowed to access');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++
const patientOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'patient') {
    next();
  } else {
    res.status(401);
    throw new Error('Your are not authorized as an patient');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++
const doctorOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    next();
  } else {
    res.status(401);
    throw new Error('Your are not authorized as an doctor');
  }
});

// ! +++++++++++++++++++++++++++++++++++++++++

const verifiedOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error('Account is not verified');
  }
});

module.exports = {
  protect,
  adminOnly,
  authorOnly,
  verifiedOnly,
  patientOnly,
  adminOrPatient,
  doctorOnly,
  doctorOrPatient,
};
