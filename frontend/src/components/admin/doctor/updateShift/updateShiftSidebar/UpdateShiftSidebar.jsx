import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LiveDate from '../../liveDate/LiveDate';

function UpdateShiftSidebar() {
  const { isLoading, doctor } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const { id } = useParams();

  //  ! ----------------------
  // ! This code creates a new Date object from the UTC value retrieved from the database,
  // ! and then uses the toLocaleString method to convert the UTC date to the Moscow timezone.
  // ! The resulting moscowDate object can then be displayed to the user in the correct timezone.
  const utcStartShiftTime = new Date(doctor?.startDate);
  const utcEndShiftTime = new Date(doctor?.endDate);
  const formattedStartShiftTime =
    moment(utcStartShiftTime).format('YYYY-MM-DD');
  const formattedEndShiftTime = moment(utcEndShiftTime).format('YYYY-MM-DD');

  // ! ---------------------------------------------------
  const formattedStartTime = moment(doctor?.startTime).format('HH:mm');
  const formattedEndTime = moment(doctor?.endTime).format('HH:mm');

  return (
    <>
      <Grid item xs={12} md={5} sx={{ m: '0 auto' }}>
        <LiveDate />
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, color: 'primary.dark' }}
          >
            {t('admin.ID')}:&nbsp;
          </Typography>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, color: 'secondary.dark' }}
          >
            {doctor?._id}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, color: 'primary.dark' }}
          >
            {t('admin.fullName')}:&nbsp;
          </Typography>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, color: 'secondary.dark' }}
          >
            {doctor?.name}
          </Typography>
        </Box>
        {/* ----------- WorkDay ---------------------------------- */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h5'
                sx={{ color: 'primary.dark', mt: '2em', fontWeight: '700' }}
              >
                {t('admin.workingDates')}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: '0.8rem',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('admin.startDate')}</TableCell>
                    <TableCell>{t('admin.endDate')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{formattedStartShiftTime}</TableCell>
                    <TableCell>{formattedEndShiftTime}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        {/* -------------Working Hours -----------*/}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h5'
                sx={{ color: 'primary.dark', mt: '2em', fontWeight: '700' }}
              >
                {t('admin.workingHours')}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: '0.8rem',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('admin.startTime')}</TableCell>
                    <TableCell>{t('admin.endTime')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{formattedStartTime}</TableCell>
                    <TableCell>{formattedEndTime}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UpdateShiftSidebar;
