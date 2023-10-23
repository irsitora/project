import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {t} from 'i18next';
import * as React from 'react';

export default function TimePicker(props) {
  const disabledTimes = [
    new Date('2023-04-26T12:00:00'),
    new Date('2023-04-26T14:00:00'),
  ];
  const { values, handleBlur, errors, touched, handleTimeChange } = props;

  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          gap='0.4rem'
          sx={{
            mt: '2em',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} md={4}>
              <Box sx={{ width: '100%' }}>
                <MobileTimePicker
                  sx={{ width: '100%', margin: '4px' }}
                  name='startTime'
                  label={`${t('admin.startTime')}`}
                  minutesStep={30}
                  ampm={false}
                  value={values.startTime}
                  disabledTimes={disabledTimes}
                  onChange={handleTimeChange('startTime')}
                  onBlur={handleBlur}
                  error={touched.startTime && Boolean(errors.startTime)}
                  helperText={touched.startTime && errors.startTime}
                />
                <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                  {errors.startTime && touched.startTime ? (
                    <>{errors.startTime}</>
                  ) : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <MobileTimePicker
                sx={{ width: '100%', margin: '4px' }}
                name='endTime' 
                label={`${t('admin.endTime')}`}
                minutesStep={30}
                ampm={false}
                value={values.endTime}
                minTime={values.startTime}
                onChange={handleTimeChange('endTime')}
                onBlur={handleBlur}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
              <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                {errors.endTime && touched.endTime ? (
                  <>{errors.endTime}</>
                ) : null}
              </Typography>
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Box>
    </>
  );
}
