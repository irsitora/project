import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
import { useNavigate } from 'react-router-dom';
import '../Doctor.css';

function WorkTime(props) {
  const navigate = useNavigate();
  const { doctor } = props;
  const formattedStartTime = moment(doctor?.startTime).format('HH:mm');
  const formattedEndTime = moment(doctor?.endTime).format('HH:mm');

  return (
    <Grid item xs={12} md={5}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
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
          <AccessTimeIcon
            sx={{ color: 'secondary.dark', fontSize: '3rem', mr: '0.5em' }}
          />
          <Typography variant='h4' sx={{ color: 'primary.dark' }}>
            {t('admin.workingHours')}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          m: '0.8rem',
          border: '1px solid lightgray',
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
  );
}

export default WorkTime;
