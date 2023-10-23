import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import appointmentTime from '../../../assets/patient/booking.png';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import SelectTime from '../../../components/patient/selectTime/SelectTime';
import { checkAvailability } from '../../../redux/features/booking/bookingSlice';

function BookingTime() {
  const { id } = useParams();

  const { isLoading, doctor, appointmentBooks } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! ---------------------------------------------------

  useEffect(() => {
    const doctorId = id;
    // ! get date that we stored to localStorage in BookingForm page
    const appointmentDate = localStorage.getItem('bookingTime').slice(1, -1);
    const appointmentDateFormatted = new Date(appointmentDate);
    const userData = { doctorId, appointmentDate: appointmentDateFormatted };
    dispatch(checkAvailability(userData));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={t('patient.selectTime')}
          img={appointmentTime}
          altImg={'booking an appointment'}
        >
          <Grid container sx={{ mt: '1em' }}>
            <Grid item xs={12} md={12} sx={{ m: '1em 0' }}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
              </IconButton>
            </Grid>
            <SelectTime appointmentBooks={appointmentBooks} />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default BookingTime;
