import DateRangeIcon from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { CardContent, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

const style = {
  Box: {
    width: '100%',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5em',
  },
};

function CardContentDetails({ doctor }) {
  const { id } = useParams();
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

  // ! --------------------------------
  const formattedStartTime = moment(doctor?.startTime).format('HH:mm');
  const formattedEndTime = moment(doctor?.endTime).format('HH:mm');
  // ! --------------------------------

  return (
    <CardContent sx={style.Box}>
      <Typography variant='h5' sx={style.info}>
        {doctor?.name}
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <EmailIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {doctor?.email}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <LocalHospitalIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {doctor?.specialist}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <DateRangeIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {formattedStartShiftTime} - {formattedEndShiftTime}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <WatchLaterIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {formattedStartTime} - {formattedEndTime}
      </Typography>
    </CardContent>
  );
}
export default CardContentDetails;
