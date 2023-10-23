import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAppointment } from '../../../redux/features/booking/bookingSlice';

const styleHeader = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '2rem',
  fontWeight: '700',
};
const style = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '1.5rem',
};
const styleDetail = {
  color: 'primary.main',
  textAlign: 'left',
  fontSize: '1.5rem',
};

const styleButton = {
  color: '#F15A59',
  fontSize: '2rem',
};
const styleButtonText = {
  color: '#F15A59',
  fontSize: '1.4rem',
  fontWeight: '600',
};

function AppointmentDetails({ appointment }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const formattedCratedDate = moment(appointment?.createdAt).fromNow();
  const formattedDate = moment(appointment?.appointmentDate).format('ll');
  const formattedTime = moment(appointment?.appointmentTime).format('HH:mm');

  const handleDelete = async (id) => {
    await dispatch(deleteAppointment(id));
    navigate(-1);
    toast.success(`${t('patient.cancelAppointmentText')}`);
  };
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHeader}>
                  {t('patient.appointment')}
                </TableCell>
                <TableCell sx={styleHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={style}>
              <TableRow>
                <TableCell sx={style}>{t('patient.booked')}</TableCell>
                <TableCell sx={styleDetail}>{formattedCratedDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.date')}</TableCell>
                <TableCell sx={styleDetail}>{formattedDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.time')}</TableCell>
                <TableCell sx={styleDetail}>{formattedTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styleButtonText}>
                  {t('patient.cancelAppointmentBtn')}
                </TableCell>
                <TableCell sx={styleDetail}>
                  <IconButton onClick={() => handleDelete(appointment?._id)}>
                    <DeleteOutlineTwoToneIcon sx={styleButton} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default AppointmentDetails;
