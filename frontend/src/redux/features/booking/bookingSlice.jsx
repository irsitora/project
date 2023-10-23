import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import bookingService from './bookingServices';

const initialState = {
  isLoggedIn: false,
  doctor: null,
  doctors: [],
  isError: false,
  isSuccess: false,
  is: false,
  isLoading: false,
  message: '',
  appointmentBooks: [],
  appointmentBooked: [],
  appointments: [],
  appointment: [],
  file: [],
  files: [],
};

// *-----------------------------
// *-------ADMIN-----------------
// *-----------------------------

// ! Add Doctor ----------------
export const addDoctor = createAsyncThunk(
  'booking/addDoctor',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.addDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Get Doctors ---------------
export const getDoctors = createAsyncThunk(
  'booking/getDoctors',
  async (_, thunkAPI) => {
    try {
      return await bookingService.getDoctors();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Get Doctors ---------------
export const getDoctor = createAsyncThunk(
  'booking/getDoctor',
  async (id, thunkAPI) => {
    try {
      return await bookingService.getDoctor(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Delete Doctor ------------
export const deleteDoctor = createAsyncThunk(
  'booking/delete',
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteDoctor(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Update Doctor Shift -----------------
export const updateDoctorShift = createAsyncThunk(
  'booking/updateDoctorShift',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.updateDoctorShift(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// *-----------------------------
// *-------PATIENT---------------
// *-----------------------------
// ! checkAvailability -----------------
export const checkAvailability = createAsyncThunk(
  'booking/checkAvailability',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.checkAvailability(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Booking -----------------
export const bookingAnAppointment = createAsyncThunk(
  'booking/bookingAnAppointment',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.bookingAnAppointment(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Appointments -----------------
export const getAppointments = createAsyncThunk(
  'booking/getAppointments',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.getAppointments(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Appointment -----------------
export const getAppointment = createAsyncThunk(
  'booking/appointment',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.getAppointment(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ! Delete Appointment ------------
export const deleteAppointment = createAsyncThunk(
  'booking/deleteAppointment',
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteAppointment(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// *-----------------------------
// *-------Doctor ---------------
// *-----------------------------
// ! Get Appointments -----------------
export const getAppointmentsDoctor = createAsyncThunk(
  'booking/getAppointmentsDoctor',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.getAppointmentsDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Appointments -----------------
export const getAppointmentDoctor = createAsyncThunk(
  'booking/getAppointmentDoctor',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.getAppointmentDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Add File ----------------
export const addFile = createAsyncThunk(
  'booking/addFile',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.addFile(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Files
export const getFiles = createAsyncThunk(
  'booking/getFiles',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.getFiles(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Delete File ------------
export const deleteFile = createAsyncThunk(
  'booking/deleteFile',
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteFile(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * ---------------------------------------

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ! Add New Doctor -----------
      .addCase(addDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctor = action.payload;
        toast.success('New Doctor Added');
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.doctor = null;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Get All Doctors --------
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Get Doctor ------------
      .addCase(getDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctor = action.payload;
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Delete Doctor ---------
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
        toast.success(`${t('reduxSlice.deleteDoctor')}`);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Update User ---------------
      .addCase(updateDoctorShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDoctorShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.message = action.payload;
        // toast.success(action.payload);
        toast.success(`${t('reduxSlice.doctorShiftUpdated')}`);
      })
      .addCase(updateDoctorShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Check Availability -----------
      .addCase(checkAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointmentBooks = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Booking an Appointment.. -----------
      .addCase(bookingAnAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookingAnAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointmentBooked = action.payload;
        toast.success(`${t('reduxSlice.appointmentBooked')}`);
      })
      .addCase(bookingAnAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Appointments -----------
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Appointment -----------
      .addCase(getAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Delete Appointment ---------
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        // toast.success(action.payload);
        toast.success(`${t('reduxSlice.appointmentCanceled')}`);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Appointments -----------
      .addCase(getAppointmentsDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentsDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointments = action.payload;
      })
      .addCase(getAppointmentsDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Appointment -----------
      .addCase(getAppointmentDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointment = action.payload;
      })
      .addCase(getAppointmentDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Add File -----------
      .addCase(addFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.file = action.payload;
        toast.success(`${t('reduxSlice.addFile')}`);
      })
      .addCase(addFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Files -----------
      .addCase(getFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Delete File ---------
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(`${t('reduxSlice.deleteFile')}`);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// ~ ------------------------------------------
export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
