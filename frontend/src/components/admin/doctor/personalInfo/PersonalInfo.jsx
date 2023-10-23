import { Box, Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDoctor,
  getDoctors,
} from '../../../../redux/features/booking/bookingSlice';
import DeleteDoctorModal from '../deleteDoctorModal/DeleteDoctorModal';
import './PersonalInfo.css';
import PersonalInfoAvatar from './personalInfoAvatar/PersonalInfoAvatar';
import PersonalInfoBody from './personalInfoBody/PersonalInfoBody';

function PersonalInfo(props) {
  const { doctor } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const formattedDate = moment.utc(doctor?.createdAt).format('YYYY-MM-DD');
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
      <Box mb='2em'>
        <Grid container>
          <PersonalInfoAvatar
            doctor={doctor}
            formattedDate={formattedDate}
            doctorId={id}
            handleOpen={handleOpen}
          />
          <PersonalInfoBody
            doctor={doctor}
            experienceDoctor={experienceDoctor}
          />
          <DeleteDoctorModal
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            doctorId={id}
            doctor={doctor}
          />
        </Grid>
      </Box>
    </>
  );
}
export default PersonalInfo;
