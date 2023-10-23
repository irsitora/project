import { createTheme, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import AddDoctor from './pages/admin/addDoctor/AddDoctor';
import Doctors from './pages/admin/doctors/Doctors';
import SingleDoctor from './pages/admin/singleDoctor/SingleDoctor';
import UpdateDoctorShift from './pages/admin/updateDoctorShift/UpdateDoctorShift';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import LoginWithCode from './pages/auth/LoginWithCode';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Verify from './pages/auth/Verify';
import ChangePassword from './pages/changePassword/ChangePassword';
import Chat from './pages/chat/Chat';
import AppointmentDetails from './pages/doctor/appointment/AppointmentDetails';
import Appointments from './pages/doctor/Appointments';
import Home from './pages/home/Home';
import Appointment from './pages/patient/appointment/Appointment';
import Booking from './pages/patient/booking/Booking';
import BookingTime from './pages/patient/booking/BookingTime';
import AllDoctors from './pages/patient/doctors/AllDoctors';
import HistoryAppointment from './pages/patient/historyAppointment/HistoryAppointment';
import PatientSingleDoctor from './pages/patient/singleDoctor/PatientSingleDoctor';
import ProfileAdmin from './pages/profile/Profile';
import UserList from './pages/userList/UserList';
import {
  getUser,
  loginStatus,
  selectIsLoggedIn,
  selectorUser,
} from './redux/features/auth/authSlice';
import AdminRoutes from './utils/AdminRoutes';
import DoctorRoutes from './utils/DoctorRoutes';
import PatientRoutes from './utils/PatientRoutes';
axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    menu: {
      main: '#537FE7',
      light: '#537FE7',
    },
    form: {
      main: '#fff',
    },
    primary: {
      dart: '#454066',
      main: '#ADA2FF',
      light: '#dcd7ff',
    },
    secondary: {
      main: '#C0DEFF',
      light: '#d2e7ff',
    },
    third: {
      dark: '#ccb7c0',
      main: '#FFE5F1',
      light: '#ffeff6',
    },
    fourth: {
      dark: '#ccc6b4',
      main: '#FFF8E1',
      light: '#fffaea',
      lighter: '#fffcf6',
    },
    btn: {
      main: '#000205',
    },
    btnAlert: {
      main: '#D61355',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsLoggedIn);
  const user = useSelector(selectorUser);

  useEffect(() => {
    dispatch(loginStatus());
    if (isLogin && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLogin, user]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer
          pauseOnHover='false'
          hideProgressBar
          autoClose={4000}
          position='top-center'
          theme='colored'
          bodyClassName='toast'
        />
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/resetPassword/:resetToken' element={<Reset />} />
            <Route path='/loginWithCode/:email' element={<LoginWithCode />} />
            <Route
              path='/verify/:verificationToken'
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path='/profile'
              element={
                <Layout>
                  <ProfileAdmin />
                </Layout>
              }
            />
            <Route
              path='/changePassword'
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              }
            />
            {/* ______AdminOnly__________ */}
            <Route element={<AdminRoutes />}>
              <Route
                path='/users'
                element={
                  <Layout>
                    <UserList />
                  </Layout>
                }
              />
              <Route
                path='/admin/addDoctor'
                element={
                  <Layout>
                    <AddDoctor />
                  </Layout>
                }
              />
              <Route
                path='/admin/doctors'
                element={
                  <Layout>
                    <Doctors />
                  </Layout>
                }
              />
              <Route
                path='/admin/doctors/:id'
                element={
                  <Layout>
                    <SingleDoctor />
                  </Layout>
                }
              />
              <Route
                path='/admin/doctors/updateShift/:id'
                element={
                  <Layout>
                    <UpdateDoctorShift />
                  </Layout>
                }
              />
            </Route>
            {/* ________PatientOnly__________ */}
            <Route element={<PatientRoutes />}>
              <Route
                path='/patient/allDoctors'
                element={
                  <Layout>
                    <AllDoctors />
                  </Layout>
                }
              />
              <Route
                path='/patient/allDoctors/:id'
                element={
                  <Layout>
                    <PatientSingleDoctor />
                  </Layout>
                }
              />
              <Route
                path='/patient/allDoctors/booking/:id'
                element={
                  <Layout>
                    <Booking />
                  </Layout>
                }
              />
              <Route
                path='/patient/allDoctors/booking/time/:id'
                element={
                  <Layout>
                    <BookingTime />
                  </Layout>
                }
              />
              <Route
                path='/patient/historyApp'
                element={
                  <Layout>
                    <HistoryAppointment />
                  </Layout>
                }
              />
              <Route
                path='/patient/historyApp/appointment'
                element={
                  <Layout>
                    <Appointment />
                  </Layout>
                }
              />
              <Route
                path='/doc/chat'
                element={
                  <Layout>
                    <Chat />
                  </Layout>
                }
              />
            </Route>
            {/* ________PatientOnly__________ */}
            <Route element={<DoctorRoutes />}>
              <Route
                path='/doctor/appointments'
                element={
                  <Layout>
                    <Appointments />
                  </Layout>
                }
              />
              <Route
                path='/doctor/appointments/:id'
                element={
                  <Layout>
                    <AppointmentDetails />
                  </Layout>
                }
              />
              <Route
                path='/pac/chat'
                element={
                  <Layout>
                    <Chat />
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
