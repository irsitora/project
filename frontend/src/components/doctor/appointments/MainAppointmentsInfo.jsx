import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DoughnutDiagramArea } from '../../pieChart/PieChart';

const styleHeader = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '2rem',
  fontWeight: '700',
};

const style = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '1.6rem',
  fontWeight: '600',
};
const styleDetail = {
  color: 'primary.main',
  textAlign: 'left',
  fontSize: '1.4rem',
  fontWeight: '700',
  ml: '0.6em',
};

const styleBoxes = {
  total: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'primary.light',
    borderRadius: '10px',
    m: '2px',
  },
  upcoming: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'secondary.light',
    borderRadius: '10px',
    m: '2px',
  },
  archived: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'third.light',
    borderRadius: '10px',
    m: '2px',
  },
  more: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'fourth.light',
    borderRadius: '10px',
    m: '2px',
  },
  pie: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '30rem',
    border: '1px solid primary.main',
  },
};

function MainAppointmentsInfo({ appointments }) {
  const { t } = useTranslation();
  // ! Today Date
  const todayDate = new Date();
  const futureAppointments = [];
  const pastAppointments = [];
  appointments?.map((appointment) => {
    if (new Date(appointment?.appointmentDate) >= todayDate) {
      futureAppointments.push(appointment);
    } else {
      pastAppointments.push(appointment);
    }
  });

  return (
    <Grid item xs={12} sm={11.5} md={6}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} minHeight='4rem'>
          <Typography sx={styleHeader}>
            {t('doctor.appointmentStatus')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5.5}
          sx={styleBoxes.total}
          height='5rem'
        >
          <Typography sx={style}> {t('doctor.total')} </Typography>
          <Typography sx={styleDetail}>{`${appointments?.length}`}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5.5}
          height='5rem'
          sx={styleBoxes.upcoming}
        >
          <Typography sx={style}> {t('doctor.upcoming')} </Typography>
          <Typography sx={styleDetail}>{futureAppointments?.length}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5.5}
          height='5rem'
          sx={styleBoxes.archived}
        >
          <Typography sx={style}> {t('doctor.archived')} </Typography>
          <Typography sx={styleDetail}>{pastAppointments.length}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={11.5}
          md={5.5}
          height='5rem'
          sx={styleBoxes.more}
        >
          <Typography sx={style}>{t('doctor.lastMonths')} </Typography>
          <Typography sx={styleDetail}>
            {futureAppointments?.length + pastAppointments.length}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={styleBoxes.pie}>
          <Box sx={{ minHeight: '300px' }}>
            <DoughnutDiagramArea
              upComing={futureAppointments?.length}
              archived={pastAppointments?.length}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainAppointmentsInfo;
