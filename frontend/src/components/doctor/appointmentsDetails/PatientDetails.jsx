import {
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
  fontSize: '1.6rem',
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

function PatientDetails({ patient }) {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Grid container columnGap={2}>
        <Grid
          item
          xs={12}
          sm={5.8}
          md={5.8}
          bgcolor='third.light'
          borderRadius='10px'
        >
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={styleHeader}>
                    {t('doctor.medicineCard')}
                  </TableCell>
                  <TableCell sx={styleHeader}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.name')}</TableCell>
                  <TableCell sx={styleDetail}>{patient?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.phone')}</TableCell>
                  <TableCell sx={styleDetail}>{patient?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.email')}</TableCell>
                  <TableCell sx={styleDetail}>{patient?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.bio')}</TableCell>
                  <TableCell sx={styleDetail}>{patient?.bio}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5.8}
          md={5.8}
          bgcolor='third.light'
          borderRadius='10px'
        >
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={styleHeader}>
                    {t('doctor.healthStatus')}
                  </TableCell>
                  <TableCell sx={styleHeader}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.sugar')}</TableCell>
                  <TableCell sx={styleDetail}>{t('doctor.no')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.allergies')}</TableCell>
                  <TableCell sx={styleDetail}>{t('doctor.no')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.tuberculosis')}</TableCell>
                  <TableCell sx={styleDetail}>{t('doctor.no')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>{t('doctor.coldAndFlu')}</TableCell>
                  <TableCell sx={styleDetail}>{t('doctor.no')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PatientDetails;
