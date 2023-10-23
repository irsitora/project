import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_DOCTORS } from '../../../redux/features/auth/filterSlice';
import { getDoctors } from '../../../redux/features/booking/bookingSlice';
import Search from '../../search/Search';

function DoctorsSearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { doctor, isLoading, doctors } = useSelector((state) => state.booking);
  // ! doctors length
  const allDoctorsNumber = doctors?.length;

  // ! ----------------

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_DOCTORS({ doctors, search }));
  }, [dispatch, doctors, search]);

  return (
    <>
      {isLoading ? null : (
        <Grid
          container
          sx={{
            minHeight: '4vh',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={8}>
            <Typography
              variant='h5'
              sx={{ fontWeight: '700', color: 'primary.main' }}
            >
              {t('admin.totalAvailableDoctors')}: {allDoctorsNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default DoctorsSearchBar;
