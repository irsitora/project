import { Grid } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WorkTime from '../../../components/admin/doctor/workTime/WorkTime';
import Workday from '../../../components/admin/doctor/workday/Workday';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import PersonalInfo from '../../../components/patient/doctor/personalInfo/PersonalInfo';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function SingleDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  //  ! ----------------------
  const today = new Date().toISOString();
  const todayDate = moment.utc(today).format('YYYY-MM-DD');
  // ! This code creates a new Date object from the UTC value retrieved from the database, and then uses the toLocaleString method to convert the UTC date to the Moscow timezone. The resulting moscowDate object can then be displayed to the user in the correct timezone.
  const utcStartShiftTime = new Date(doctor?.startDate);
  const utcEndShiftTime = new Date(doctor?.endDate);
  const formattedStartShiftTime =
    moment(utcStartShiftTime).format('YYYY-MM-DD');
  const formattedEndShiftTime = moment(utcEndShiftTime).format('YYYY-MM-DD');
  // ! ---------------------------------------------------
  useEffect(() => {
    dispatch(getDoctor(id));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper>
          <PersonalInfo
            doctor={doctor}
            todayDate={todayDate}
            formattedStartShiftTime={formattedStartShiftTime}
            formattedEndShiftTime={formattedEndShiftTime}
          />
          <hr color='#C0DEFF' />

          <Grid
            container
            sx={{ mt: '1em', display: 'flex', justifyContent: 'space-between' }}
          >
            <Workday
              doctor={doctor}
              todayDate={todayDate}
              formattedStartShiftTime={formattedStartShiftTime}
              formattedEndShiftTime={formattedEndShiftTime}
            />
            <WorkTime
              doctor={doctor}
              todayDate={todayDate}
              formattedStartShiftTime={formattedStartShiftTime}
              formattedEndShiftTime={formattedEndShiftTime}
            />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default SingleDoctor;
