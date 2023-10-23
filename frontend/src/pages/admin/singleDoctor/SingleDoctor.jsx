import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { t } from 'i18next';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PersonalInfo from '../../../components/admin/doctor/personalInfo/PersonalInfo';
import WorkTime from '../../../components/admin/doctor/workTime/WorkTime';
import Workday from '../../../components/admin/doctor/workday/Workday';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function SingleDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  //  ! ----------------------
  const today = new Date().toISOString();
  const todayDate = moment.utc(today).format('YYYY-MM-DD');
  // ! This code creates a new Date object from the UTC value retrieved from the database, and then uses the toLocaleString method to convert the UTC date to the Moscow timezone. The resulting moscowDate object can then be displayed to the user in the correct timezone.

  const utcStartShiftTime = new Date(doctor?.startDate);
  const utcEndShiftTime = new Date(doctor?.endDate);
  // const moscowDate = new Date(
  //   utcStartShiftTime.toLocaleString('en-US', { timeZone: 'Europe/Moscow' })
  // );
  // const formattedDate = moment(utcEndShiftTime).format('YYYY-MM-DD');
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
          <PersonalInfo doctor={doctor} />
          <hr color='#C0DEFF' />
          {formattedEndShiftTime < todayDate ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: '2em',
              }}
            >
              <NotificationsActiveIcon
                fontSize='large'
                sx={{ color: 'red', mr: '0.4em' }}
              />
              <Typography variant='h5' color='red'>
                {t('admin.updateWorkDay')}
              </Typography>
              <Box>
                <IconButton
                  onClick={() =>
                    navigate(`/admin/doctors/updateShift/${doctor?._id}`)
                  }
                >
                  <EditCalendarRoundedIcon
                    sx={{ fontSize: '3rem', color: 'green' }}
                  />
                </IconButton>
              </Box>
            </Box>
          ) : (
            ''
          )}
          <Grid
            container
            sx={{
              mt: '1em',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '2em',
            }}
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
