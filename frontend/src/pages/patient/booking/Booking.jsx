import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateShift from '../../../assets/admin/calendar.png';
import UpdateShiftSidebar from '../../../components/admin/doctor/updateShift/updateShiftSidebar/UpdateShiftSidebar';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import BookingForm from '../../../components/patient/bookingForm/BookingForm';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';
import {t} from 'i18next';

function Booking() {
  const { isLoading } = useSelector((state) => state.booking);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctor(id));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={t('patient.booking')}
          img={UpdateShift}
          altImg={'booking an appointment'}
        >
          <Grid container sx={{ mt: '2em' }}>
            <Grid item xs={12} md={12} sx={{ m: '1em 0' }}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
              </IconButton>
            </Grid>
            <UpdateShiftSidebar />
            <BookingForm />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default Booking;
