import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/admin`;
const API_URL2 = `${BACKEND_URL}/api/patient`;
const API_URL3 = `${BACKEND_URL}/api/doctor`;

// *-----------------------------
// *-------ADMIN-----------------
// *-----------------------------

// ! Register(Add Doctor) ---------------------
const addDoctor = async (userData) => {
  const response = await axios.post(API_URL + '/addDoctor', userData);
  return response.data;
};

// ! Get All Doctors --------------------------
const getDoctors = async () => {
  const response = await axios.get(API_URL + '/getDoctors');
  return response.data;
};

// ! Get Single Doctor -----------------------
const getDoctor = async (id) => {
  const response = await axios.get(API_URL + `/getDoctors/${id}`);
  return response.data;
};

// ! Delete Doctor ---------------------------
const deleteDoctor = async (id) => {
  const response = await axios.delete(API_URL + `/getDoctors/${id}`);
  return response.data;
};
// ! Update Doctor Shift ---------------------------
const updateDoctorShift = async (userData) => {
  const { id } = userData;
  const response = await axios.patch(API_URL + `/getDoctors/${id}`, userData);
  return response.data;
};

// *-----------------------------
// *-------PATIENT---------------
// *-----------------------------
// ! Check Availability ------------------
const checkAvailability = async (userData) => {
  const response = await axios.get(
    API_URL2 + `/allDoctors/check-booking-availability`,
    { params: userData }
  );
  return response.data;
};
// ! Booking an Appointment ----------------
const bookingAnAppointment = async (userData) => {
  const response = await axios.post(API_URL2 + `/allDoctors/:id`, userData);
  return response.data;
};

// ! Get Appointments -------------------
const getAppointments = async (userData) => {
  const response = await axios.get(API_URL2 + '/allDoctors/history', {
    params: userData,
  });
  return response.data;
};
// ! Get Appointment -------------------
const getAppointment = async (userData) => {
  const response = await axios.get(
    API_URL2 + '/allDoctors/history/appointment',
    {
      params: userData,
    }
  );
  return response.data;
};

// ! Delete Appointment ---------------------------
const deleteAppointment = async (id) => {
  const response = await axios.delete(
    API_URL2 + `/allDoctors/history/appointment/${id}`
  );
  return response.data;
};

// *-----------------------------
// *-------Doctor----------------
// *-----------------------------
// ! Get Appointments -------------------
const getAppointmentsDoctor = async (userData) => {
  const response = await axios.get(API_URL3 + '/appointments', {
    params: userData,
  });
  return response.data;
};
const getAppointmentDoctor = async (userData) => {
  const { id } = userData;
  const response = await axios.get(API_URL3 + `/appointments/${id}`, {
    params: userData,
  });
  return response.data;
};
// * ------------------------------
// * --------Add file -------------
// * ------------------------------
const addFile = async (userData) => {
  const response = await axios.post(API_URL3 + '/files', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
const getFiles = async (userData) => {
  const response = await axios.get(API_URL3 + '/files', {
    params: userData,
  });
  return response.data;
};
const deleteFile = async (id) => {
  const response = await axios.delete(API_URL3 + `/download/${id}`);
  return response.data;
};
// *--------------------------------------------
// ! Download pdf request is in components/doctor/appointmentDetails/AppointmentBookedDetails/File.jsx
// *--------------------------------------------

const bookingService = {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctorShift,
  checkAvailability,
  bookingAnAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  getAppointmentsDoctor,
  getAppointmentDoctor,
  addFile,
  getFiles,
  deleteFile,
};

export default bookingService;
