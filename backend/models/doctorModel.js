const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
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
      required: [true, 'Please add a passwrod'],
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
      // required: true,
      default: 'doctor',
      // subscriber, author, and admin (suspended)
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    specialist: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    experiences: [
      {
        hospitalName: { type: String, required: true },
        years: { type: Number, required: true },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ! Encrypt password before saving user.
doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // ! Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// ! --------------------------------

const DoctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorModel;
