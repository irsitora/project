import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Grid, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointment } from '../../../redux/features/booking/bookingSlice';

function Upcoming({ appointments, isLoading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { appointment } = useSelector((state) => state.booking);

  const handleCLick = async (appointmentId, doctorId) => {
    const userData = {
      appointmentId,
      doctorId,
    };
    // ! save it to localStorage to use it in Appointment page
    localStorage.setItem('appointmentId', JSON.stringify(appointmentId));
    localStorage.setItem('doctorId', JSON.stringify(doctorId));
    await dispatch(getAppointment(userData));
    navigate('/patient/historyApp/appointment');
  };

  // ! ----------Filter Upcoming Appointments ------------------
  const todayDate = moment(new Date()).format('YYYY:MM:DD');
  const upComing = appointments?.filter((date) => {
    const formattedDate = moment(date.appointmentDate).format('YYYY:MM:DD');
    return formattedDate >= todayDate;
  });
  //   ! ----------------------------------------------------

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Typography
        sx={{
          fontSize: '2rem',
          color: 'primary.main',
          ml: '0.4em',
        }}
      >
        {t('patient.upcomingAppointments')}
      </Typography>
      {!isLoading && upComing.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minWidth: '20rem',
            m: '0 auto',
          }}
        >
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: '3rem', color: 'secondary.dark' }}
          />
          <Typography
            sx={{
              fontSize: '2rem',
              color: 'third.dark',
              ml: '0.4em',
              textAlign: 'center',
            }}
          >
            {t('patient.upcomingAppointmentsEmpty')}
          </Typography>
        </Box>
      ) : (
        <>
          {upComing?.map((appointment) => {
            const formattedDate = moment(appointment.appointmentDate).format(
              'MMM Do YY'
            );
            const formattedTime = moment(appointment.appointmentTime).format(
              'HH:mm'
            );
            return (
              <Accordion
                key={appointment._id}
                sx={{ bgcolor: 'secondary.light' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography
                    sx={{
                      color: 'secondary.dark',
                      fontSize: '1.6rem',
                      fontWeight: '700',
                    }}
                  >
                    {formattedDate}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      border: '1px solid',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderColor: 'third.dark',
                      bgcolor: 'form.main',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'primary.dark',
                        fontSize: '1.5rem',
                        fontWeight: '500',
                      }}
                    >
                      {formattedTime}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleCLick(appointment._id, appointment.doctorId)
                      }
                    >
                      <ContentPasteGoIcon
                        sx={{
                          fontSize: '2.6rem',
                          color: 'secondary.dark',
                        }}
                      />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </Grid>
  );
}
export default Upcoming;
