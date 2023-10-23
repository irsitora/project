const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
const doctorSendEmail = require('../utils/doctorSendEmail');

// ! ----------------------------------------------------------------------------------------------------------
// ! Booking Appointment Logic to book an appointment:
// ! We have implemented a check to ensure that the selected date and time fall within the doctor's working hours.
// ! Specifically, the date and time must be later than the start of the doctor's workday and start work time
// ! and earlier than the end of the doctor's workday and end work time, as set by the admin.
// !----------------------------------------------------------------------------------------------------------

// * -------------------------------------
const bookAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;
  const doctor = await Doctor.findOne({ _id: doctorId });
  const { startDate, endDate, startTime, endTime, name } = doctor;
  const patient = await User.findOne({ _id: patientId });

  // ! change date formate that client sent
  // ! to compare date I must user 12/12/2034 format for date
  const appointmentDateFormatted = new Date(
    appointmentDate
  ).toLocaleDateString();
  const appointmentEndDateFormatted = new Date(endDate).toLocaleDateString();
  const appointmentStartDateFormatted = new Date(
    startDate
  ).toLocaleDateString();

  // ! check that patient if booked already at the same date
  const timestamp1 = new Date(appointmentDate);
  const timestamp2 = new Date(
    timestamp1.getFullYear(),
    timestamp1.getMonth(),
    timestamp1.getDate()
  );
  const appointmentDateToISOString = timestamp2.toISOString();
  const checkAppointment = await Appointment.findOne({
    doctorId,
    patientId,
    appointmentDate: {
      $gte: appointmentDateToISOString,
      $lte: appointmentDate,
    },
  });

  if (checkAppointment) {
    res.status(400);
    throw new Error(`You already booked on this date to ${name}`);
  } else {
    // ! validation ------------------------------
    if (!appointmentDate || !appointmentTime) {
      res.status(400);
      throw new Error('Please fill in all the required fields ');
    }

    const formattedAppointmentTime = moment(appointmentTime).format('HH:mm');
    const formattedStartTime = moment(startTime).format('HH:mm');
    // ! we subtract 1 hour from the end time
    const formattedEndTime = moment(endTime)
      .subtract(1, 'hour')
      .format('HH:mm');

    if (
      appointmentDateFormatted >= appointmentStartDateFormatted &&
      appointmentDateFormatted <= appointmentEndDateFormatted &&
      formattedAppointmentTime >= formattedStartTime &&
      formattedAppointmentTime <= formattedEndTime
    ) {
      // ! If appointment date and time is available then save to db.
      const appointment = await Appointment.create({
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
      });

      const subject = 'A new appointment booked';
      const send_to = doctor.email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = 'noreply@zino.com';
      const template = 'bookingNotifications';
      const doctorName = doctor.name;
      const patientName = patient.name;
      const patientEmail = patient.email;
      const date = timestamp2;
      const time = formattedAppointmentTime;
      // ! Check if booked successfully
      if (appointment) {
        // ! --------------------------------------------------
        // ! Send Email
        try {
          await doctorSendEmail(
            subject,
            send_to,
            sent_from,
            reply_to,
            template,
            doctorName,
            patientName,
            patientEmail,
            date,
            time
          );
          res.status(201).json(appointment);
        } catch (error) {
          res.status(500);
          // throw new Error('Email not sent, please try again');
          console.log(error);
        }
        // ! --------------------------------------------------
      } else {
        res.status(400);
        throw new Error('Invalid appointment data');
      }
    } else {
      res.status(400);
      throw new Error(`Dr. ${name} is not available on that date`);
    }
  }
});

// ! ------------------------------------------------------------------------------------------------
// ! To select a booking time on a specific date, the patient must first choose an available workday
// ! for the doctor from the DatePicker.  The DatePicker has been configured using minDate and maxDate
// ! to restrict the patient to selecting only valid workdays.
// ! After the patient selects a workday, the server will send three arrays to the frontend.
// ! These arrays will include booked times, available times, and all times available for booking.
// ! This information will help the patient select a suitable time for their appointment.
// ! -------------------------------------------------------------------------------------------------

// * ------------------------------------
const checkAvailability = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate } = req.query;

  const doctor = await Doctor.findById(doctorId);
  const { startTime, endTime } = doctor;

  const dateFormatted = new Date(appointmentDate);
  const timeStampsToISOString = dateFormatted.toISOString();
  console.log(timeStampsToISOString);

  const timestamp1 = new Date(appointmentDate);
  const timestamp2 = new Date(
    timestamp1.getFullYear(),
    timestamp1.getMonth(),
    timestamp1.getDate()
  );
  const appointmentDateToISOString = timestamp2.toISOString();

  // ! Get the list of existing appointment
  const existingAppointments = await Appointment.find({
    doctorId,
    appointmentDate: {
      $gte: appointmentDateToISOString,
      $lte: appointmentDate,
    },
  });

  // ! Calculate the booked time slots
  const bookedTimeSlots = existingAppointments.map((appointment) =>
    moment(appointment.appointmentTime).format('HH:mm')
  );

  // ! Calculate the all time slots
  const availableTimeSlots = [];
  let currentTimeSlot = moment(startTime);

  while (currentTimeSlot.isBefore(endTime)) {
    if (!bookedTimeSlots.find((slot) => slot.match(currentTimeSlot))) {
      availableTimeSlots.push(currentTimeSlot.format('HH:mm'));
    }
    currentTimeSlot.add(1, 'hour');
  }

  // ! calculate available time
  const availableTime = availableTimeSlots.filter(
    (time) => !bookedTimeSlots.includes(time)
  );

  res.status(200).json({
    availableTime,
    bookedTimeSlots,
    availableTimeSlots,
    appointmentDate,
  });
});

// * ------------------------------------
const getAppointments = asyncHandler(async (req, res) => {
  const { patientId } = req.query;

  if (!patientId) {
    res.status(400);
    throw new Error('Patient ID is required!');
  }

  const appointments = await Appointment.find({
    patientId,
  }).sort('-createdAt');

  if (!appointments) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json(appointments);
});

// * ------------------------------------
const getAppointment = asyncHandler(async (req, res) => {
  const { doctorId, appointmentId } = req.query;
  console.log(doctorId, appointmentId);

  // ! Validation ----------------------------
  if (!doctorId) {
    res.status(400);
    throw new Error('Doctor ID is required!');
  }
  if (!appointmentId) {
    res.status(400);
    throw new Error('Appointment ID is required!');
  }
  //  ! Find appointment ----------------------
  const appointment = await Appointment.findOne({
    _id: appointmentId,
  });

  // ! Find Doctor -------------------------
  const doctor = await Doctor.findOne({
    _id: doctorId,
  });

  if (!appointment) {
    res.status(200);
    res.json('Appointment not found!');
  }
  res.status(200).json({ appointment, doctor });
});

// * ---------------------------------------

const deleteAppointment = asyncHandler(async (req, res) => {
  // ! Take user id from params
  const appointment = Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  await appointment.remove();
  res.status(200).json({
    message: 'Appointment deleted successfully',
  });
});

module.exports = {
  bookAppointment,
  checkAvailability,
  getAppointments,
  getAppointment,
  deleteAppointment,
};
