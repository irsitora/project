const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    photo: {
      type: String,
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
      type: String,
      default: '+7',
    },
    bio: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      required: true,
      default: 'patient',
      // subscriber, author, and admin (suspended)
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestpamps: true,
    minimize: false,
  }
);

// ! Encrypt password before saving user.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // ! Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
// ! -----------------------

const User = mongoose.model('User', userSchema);
module.exports = User;
