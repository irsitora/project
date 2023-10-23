import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { t } from 'i18next';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingAnAppointment } from '../../../redux/features/booking/bookingSlice';
import { CustomButtonOne } from '../../customUtils/customButtons/CustomButtonOne';

function SelectTime() {
  const { id } = useParams();
  const [time, setTime] = useState('');
  const { isLoading, appointmentBooks } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  console.log(appointmentBooks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ! ------------------------------------------
  const handleChange = (event) => {
    setTime(event.target.value);
  };
  // ! --------------------------------------------
  let newDateFormatted;
  if (time) {
    const timeString = `${time}`;
    const today = new Date();
    const dateString = today.toISOString().substring(0, 10);
    const dateTimeString = `${dateString}T${timeString}:00`;
    newDateFormatted = new Date(dateTimeString).toISOString();
    // ! DON'T NEED TO ADD 3 HOURS
    // appointmentTimeFormatted = moment
    //   .utc(newDateFormatted)
    //   .add(3, 'hours')
    //   .format();
  }
  // ! ---------------------------------------------
  const appointmentDate = new Date(appointmentBooks?.appointmentDate);
  const appointmentDateFormatted =
    moment(appointmentDate).format('MMMM Do YYYY');

  const shift = appointmentBooks?.availableTimeSlots;
  const available = appointmentBooks?.availableTime;
  const booked = appointmentBooks?.bookedTimeSlots;
  // ! --------------------------------------------
  const shiftTable = (
    <>
      <TableContainer>
        <Table
          sx={{
            bgcolor: '#94c2e5',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>{t('patient.shift')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shift?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // ! --------------------------------------------
  const availableTime = (
    <>
      <TableContainer>
        <Table
          sx={{
            textAlign: 'center',
            bgcolor: '#ccffb2',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>{t('patient.available')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {available?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
  // ! --------------------------------------------
  const bookedTimes = (
    <>
      <TableContainer>
        <Table
          sx={{
            bgcolor: '#f2c1c1',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>{t('patient.booked')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booked?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // ! ---------------------------------------------------
  const handleSubmit = async () => {
    const doctorId = id;
    const patientId = user?._id;
    const appointmentTime = newDateFormatted;
    // ! get date that we stored to localStorage in BookingForm page
    const appointmentDate = localStorage.getItem('bookingTime').slice(1, -1);
    const appointmentDateFormatted = new Date(appointmentDate);
    const userData = {
      doctorId,
      patientId,
      appointmentTime,
      appointmentDate: appointmentDateFormatted,
    };
    await dispatch(bookingAnAppointment(userData));
    navigate('/patient/historyApp');
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Grid container sx={{ width: '80%', m: '0 auto' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ fontSize: '2rem', color: 'primary.main', m: '1em' }}
        >
          {appointmentDateFormatted}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {shiftTable}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {availableTime}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {bookedTimes}
        </Grid>
        <Grid item xs={12} sm={6} md={6} my='2em'>
          <FormControl sx={{ width: '60%' }}>
            <InputLabel id='demo-simple-select-label'>
              {t('patient.times')}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={time}
              label='time'
              onChange={handleChange}
            >
              {available?.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <CustomButtonOne
            label={'Submit'}
            disabled={!time}
            sx={{ mt: '0', ml: '1em' }}
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectTime;
