import { Box, Grid } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryImg from '../../../assets/patient/history.png';
import BackNav from '../../../components/customUtils/backNav/BackNav';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import { Spinner } from '../../../components/loader/Loader';
import Archived from '../../../components/patient/appointmentsHistory/Archived';
import Upcoming from '../../../components/patient/appointmentsHistory/Upcoming';
import { getAppointments } from '../../../redux/features/booking/bookingSlice';
import {t} from 'i18next';

function HistoryAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments, isLoading } = useSelector((state) => state.booking);
  //  ! ----------------------------------------------------------

  // ! filterAppointments that is old
  const todayDate = moment(new Date()).format('YYYY:MM:DD');
  if (appointments) {
    const oldDate = appointments?.filter((date) => {
      const formattedDate = moment(date.appointmentDate).format('YYYY:MM:DD');
      return formattedDate < todayDate;
    });
  }

  // ! ----------------------------------------------------------
  useEffect(() => {
    if (user?._id) {
      const userData = { patientId: user._id };
      dispatch(getAppointments(userData));
    }
  }, [dispatch, user]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FormWrapper
          title={t('patient.appointmentHistory')}
          img={HistoryImg}
          altImg={'Your Appointment History'}
        >
          <Box sx={{ width: '90%', m: '0 auto' }}>
            <BackNav />
            <Grid container minWidth='100%'>
              <>
                <>
                  <Upcoming appointments={appointments} />
                  <Archived appointments={appointments} />
                </>
              </>
            </Grid>
          </Box>
        </FormWrapper>
      )}
    </>
  );
}

export default HistoryAppointment;
