import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { t } from 'i18next';
import React from 'react';

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

function DoctorAppointmentDetails({ doctor }) {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHeader}>{t('patient.doctor')}</TableCell>
                <TableCell sx={styleHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={style}>{t('patient.name')}</TableCell>
                <TableCell sx={styleDetail}>{doctor?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.email')}</TableCell>
                <TableCell sx={styleDetail}>{doctor?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.phone')}</TableCell>
                <TableCell sx={styleDetail}>{doctor?.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.specialist')}</TableCell>
                <TableCell sx={styleDetail}>{doctor?.specialist}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>{t('patient.fee')}</TableCell>
                <TableCell sx={styleDetail}>{doctor?.fee}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default DoctorAppointmentDetails;
