const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const bcryptjs = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const Cryptr = require('cryptr');
const { OAuth2Client } = require('google-auth-library');

const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// *--------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //! validation
  if (!name || !email || !password) {
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

  // ! Create new User
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
  });

  // ! Generate Token
  const token = genereteteToken(user._id);
  // ! Send  HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // one day
    sameSite: 'none',
    secure: true,
  });
  // ! if user created successfuly & SEND to frontend
  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res
      .status(201)
      .json({ _id, name, email, phone, bio, photo, role, isVerified, token });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// *--------------------------------------
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  // ! if user is verified already
  if (user.isVerified) {
    res.status(400);
    throw new Error('User already verified');
  }
  // ! Delete Token If it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }
  // ! Create verification Token and Save to DB
  const verificationToken = crypto.randomBytes(32).toString('hex') + user._id;

  console.log(verificationToken);
  // ! hash token and save using  crypto
  const hashedToken = hashToken(verificationToken);

  // ! save to database
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 1 hour
  }).save();

  // ! Construct Verificaton URL and send to frontend user
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // ! Send Email
  const subject = 'Verify Your Account';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = 'noreply@zino.com';
  const template = 'verifyEmail';
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({
      message:
        'Verification Email Sent, If you did not receive email, please check your spam or try again',
    });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

// *--------------------------------------
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  // ! Hashed token from datsbase
  const hashedToken = hashToken(verificationToken);

  console.log(`hashToken: ${hashedToken}`);
  // console.log(`hashToken: ${typeof hashedToken}`);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired token');
  }

  // ! Find User from User Model by userId
  const user = await User.findOne({
    _id: userToken.userId,
  });

  if (user.isVerified) {
    res.status(400);
    throw new Error('User is already verified');
  }

  // ! Verify User
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: 'Account Verificaton successful' });
});

// *--------------------------------------

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // ! Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and Password');
  }
  // ! If user not exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found, please singup');
  }
  // ! If user exists & bcrypt password back
  const passwordIsCorrect = await bcryptjs.compare(password, user.password);
  // ! If password is Incorrect
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  // ! Trgger 2FA for unknown UserAgent
  const ua = parser(req.headers['user-agent']);
  const thisUserAgent = ua.ua;

  console.log(thisUserAgent);
  // ! Check for Agent that saved to database
  const allowAgent = user.userAgent.includes(thisUserAgent);
  if (!allowAgent) {
    // ! Generate  6 digit code
    const loginCode = Math.floor(100000 + Math.random() * 900000);
    console.log(loginCode);
    // ! Encrypt   loginCode before saving to database
    const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    let userToken = await Token.findOne({ userId: user._id });
    if (userToken) {
      await userToken.deleteOne();
    }

    // ! saving Token to database
    await new Token({
      userId: user._id,
      lToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), // 60minutes
    }).save();

    res.status(400);
    throw new Error('New browser or device detected');
  }

  // ! Generate Token
  const token = genereteteToken(user._id);

  if (user && passwordIsCorrect) {
    // ! Send  HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // one day
      sameSite: 'none',
      secure: true,
    });
  } else {
    res.status(500);
    throw new Error('Something went wrong!, Please try again later');
  }

  // ! if user created successfuly & SEND to frontend
  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error('Something went wrong, please try agian');
  }
});

// * ------------------------------------

const logoutUser = asyncHandler(async (req, res) => {
  // ! Expire cookie
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(Date(0)),
    sameSite: 'none',
    secure: true,
  });

  return res.status(200).json({ message: 'Logout Successful' });
});

// * -----------------------------------

const getUser = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// * ------------------------------------

const updateUser = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const user = await User.findById(req.user._id);
  const doctor = await Doctor.findOne({ userId: req.user._id });

  if (user) {
    const { name, email, phone, bio, photo, role, isVerified } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updateUser = await user.save();

    // !  If the user Is doctor, the info in Doctor Model should change too.

    doctor.email = email;
    doctor.name = req.body.name || name;
    doctor.phone = req.body.phone || phone;
    doctor.bio = req.body.bio || bio;
    doctor.photo = req.body.photo || photo;

    await doctor.save();

    res.status(201).json({
      // _id,
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      bio: updateUser.bio,
      photo: updateUser.photo,
      role: updateUser.role,
      isVerified: updateUser.isVerified,
    });
  } else {
    res.status('404');
    throw new Error('User not found');
  }
});

// * -----------------------------------

const deleteUser = asyncHandler(async (req, res) => {
  // ! Take user id from params
  const user = User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await user.remove();
  res.status(200).json({
    message: 'User deleted successfully',
  });
});

// * ------------------------------------
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort('-createdAt').select('-password');
  if (!users) {
    res.status(500);
    throw new Error('Something went wrong, please try again');
  }
  res.status(200).json(users);
});

// * -----------------------------------

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // ! Verify Token
  const Verified = jwt.verify(token, process.env.JWT_SECRET);
  if (Verified) {
    return res.json(true);
  }
  return res.json(false);
});

// * ------------------------------------
const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.role = role;
  await user.save();

  // ! send message to frontend
  res.status(200).json({
    message: `User role updated to ${role} `,
  });
});

// * ------------------------------------
const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error('Missing email parameter');
  }

  // Get user
  const user = await User.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({
      message:
        'Email Sent, If you did not receive email, please check your spam or try again',
    });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

// * -----------------------------------

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('No user with this email');
  }

  // ! Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // !  Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString('hex') + user._id;
  console.log(resetToken);

  // ! Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // Send Email
  const subject = 'Password Reset Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = 'noreply@zino.com';
  const template = 'forgotPassword';
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: 'Password Reset Email Sent' });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

// * ----------------------------------

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token');
  }
  // ! Find User from token
  const user = await User.findOne({ _id: userToken.userId });
  // ! Now Reset Password
  user.password = password;
  await user.save();

  res
    .status(200)
    .json({ message: 'Password reset Successfully, please Login' });
});

// * -----------------------------------
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error('Please enter old and new password');
  }

  // ! Check if old password is correct
  const passwordIsCorrect = await bcryptjs.compare(oldPassword, user.password);
  // ! Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } else {
    res.status(400);
    throw new Error('Current Password is incorrect');
  }
});

// * -----------------------------------
const sendLoginCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // ! Find use token from Database
  const userToken = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired token, please login again');
  }

  const loginCode = userToken.lToken;
  // ! Decrypt code
  const decryptLoginCode = cryptr.decrypt(loginCode);

  // ! Send Login Code
  const subject = 'Login Access Code';
  const send_to = email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = 'noreply@mail.com';
  const template = 'loginCode';
  const name = user.name;
  const link = decryptLoginCode;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res
      .status(200)
      .json({ message: `Access Code sent to your email ${email}` });
  } catch (error) {
    res.status(500);
    throw new Error('Email not send, please try again');
  }
});

// * -----------------------------------
const loginWithCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { loginCode } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }
  // ! Finde User Login Token
  const userToken = await Token.findOne({
    userId: user.id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token, please login again');
  }

  const decryptLoginCode = cryptr.decrypt(userToken.lToken);
  if (loginCode !== decryptLoginCode) {
    throw new Error('Incorrect login code, please try again');
  } else {
    // ! Register user Agent
    const ua = parser(req.headers['user-agent']);
    const thisUserAgent = ua.ua;
    user.userAgent.push(thisUserAgent);
    await user.save();

    // ! Generate Token
    const token = genereteteToken(user._id);
    // ! Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // one day
      sameSite: 'none',
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
    });
  }
});
// * -----------------------------------
const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // ! Data form gmail account
  const payload = ticket.getPayload();
  const { name, email, picture, sub } = payload;

  const password = Date.now() + sub;

  // ! Get UserAgent
  const ua = parser(req.headers['user-agent']);
  const userAgent = [ua.ua];

  // ! Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    // ! Register new user
    const newUser = await User.create({
      name,
      email,
      password,
      photo: picture,
      userAgent,
      isVerified: true,
    });

    if (newUser) {
      // ! Generate Token
      const token = genereteteToken(user._id);
      // ! Send HTTP-only cookie
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
      });

      const { _id, name, email, phone, bio, photo, role, isVerified } = newUser;
      res.status(201).json({
        _id,
        name,
        email,
        phone,
        bio,
        photo,
        role,
        isVerified,
        token,
      });
    }
  }

  // ! User exists, login
  if (user) {
    const token = genereteteToken(user._id);

    // ! Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};
