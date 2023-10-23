import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Appointment from '../../../assets/doctor/user.png';
import AppointmentBookedDetails from '../../../components/doctor/appointmentsDetails/AppointmentBookedDetails';
import File from '../../../components/doctor/appointmentsDetails/File';
import PatientDetails from '../../../components/doctor/appointmentsDetails/PatientDetails';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import { Spinner } from '../../../components/loader/Loader';
import { getAppointmentDoctor } from '../../../redux/features/booking/bookingSlice';

function AppointmentDetails() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { appointment, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    if (user) {
      const userData = {
        id,
        doctorId: user?._id,
      };
      dispatch(getAppointmentDoctor(userData));
    }
  }, [dispatch, user]);

  return (
    <>
      {appointment  ? (
        <>
          <FormWrapper
            title={`${t('doctor.appointment')}`}
            img={Appointment}
            altImg={'Your Appointment History'}
          >
            <Grid container columnGap={2} rowGap={2}>
              <PatientDetails patient={appointment?.user} />
              <AppointmentBookedDetails
                appointment={appointment?.appointment}
              />
              <File patient={appointment?.user} doctor={user} />
            </Grid>
          </FormWrapper>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default AppointmentDetails;
