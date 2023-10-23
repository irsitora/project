import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryImg from '../../../assets/patient/history.png';
import BackNav from '../../../components/customUtils/backNav/BackNav';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import AppointmentDetails from '../../../components/patient/appointment/AppointmentDetails';
import DoctorAppointmentDetails from '../../../components/patient/appointment/DoctorAppointmentDetails';
import File from '../../../components/patient/appointment/File';
import { getAppointment } from '../../../redux/features/booking/bookingSlice';
import {t} from 'i18next';

function Appointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { appointment } = useSelector((state) => state.booking);

  // ! get date that we stored to localStorage in HistoryAppointment page
  const appointmentId = localStorage.getItem('appointmentId').slice(1, -1);
  const doctorId = localStorage.getItem('doctorId').slice(1, -1);

  //  ! ----------------------------------------------------------
  useEffect(() => {
    const userData = {
      appointmentId,
      doctorId,
    };
    if (appointment) {
      dispatch(getAppointment(userData));
    }
  }, [dispatch, user]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={t('patient.appointment')}
          img={HistoryImg}
          altImg={'Your Appointment History'}
        >
          <Box sx={{ width: '90%', m: '0 auto' }}>
            <BackNav />
            <Grid container>
              <DoctorAppointmentDetails doctor={appointment?.doctor} />
              <AppointmentDetails appointment={appointment?.appointment} />
              <File />
            </Grid>
          </Box>
        </FormWrapper>
      )}
    </>
  );
}

export default Appointment;
