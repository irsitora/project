import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDoctor,
  getDoctors,
} from '../../../../redux/features/booking/bookingSlice';
import PersonalInfoAvatar from './personalInfoAvator/PersonalInfoAvatar';
import PersonalInfoBody from './personalInfoBody/PersonalInfoBody';

function PersonalInfo(props) {
  const { doctor, todayDate, formattedStartShiftTime, formattedEndShiftTime } =
    props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // ! Count Doctor experiences from array
  const experienceDoctor = doctor?.experiences?.reduce((total, exp) => {
    return total + exp.years;
  }, 0);

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id));
    dispatch(getDoctors());
    navigate('/admin/doctors');
  };

  return (
    <>
      <Box>
        <Grid container>
          <PersonalInfoAvatar
            doctor={doctor}
            doctorId={id}
            handleOpen={handleOpen}
          />

          <PersonalInfoBody
            doctor={doctor}
            experienceDoctor={experienceDoctor}
          />
        </Grid>
        <Grid container>
          <Grid item xs={10} md={10} m='2em auto' textAlign='center'>
            {formattedEndShiftTime >= todayDate ? (
              <Box>
                <Typography variant='h5' sx={{ color: 'green' }}>
                  {t('patient.availableDoctor')}
                </Typography>
                <IconButton
                  onClick={() => navigate(`/patient/allDoctors/booking/${id}`)}
                >
                  <BookmarkAddTwoToneIcon
                    color='green'
                    sx={{ fontSize: '3rem', color: 'green' }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PriorityHighIcon sx={{ color: 'red', fontSize: '2.6rem' }} />
                <Typography variant='h5' sx={{ color: 'red' }}>
                  {t('patient.notAvailableDoctor')}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default PersonalInfo;
