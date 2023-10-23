import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateShift from '../../../assets/admin/calendar.png';
import UpdateShiftForm from '../../../components/admin/doctor/updateShift/updateShiftForm/UpdateShiftForm';
import UpdateShiftSidebar from '../../../components/admin/doctor/updateShift/updateShiftSidebar/UpdateShiftSidebar';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function UpdateDoctorShift() {
  const { isLoading, doctor } = useSelector((state) => state.booking);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctor(id));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={t('admin.updateText')}
          img={UpdateShift}
          altImg={t('admin.updateText')}
        >
          <Grid container sx={{ mt: '2em' }}>
            <Grid item xs={12} md={12} sx={{ m: '1em 0' }}>
              <IconButton onClick={() => navigate(`/admin/doctors/${id}`)}>
                <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
              </IconButton>
            </Grid>
            <UpdateShiftSidebar />
            <UpdateShiftForm />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default UpdateDoctorShift;
