import { Grid } from '@mui/material';
import React from 'react';
import RecentChats from './RecentChats';
import SearchDrawer from './SearchDrawer';

const MyChats = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchDrawer />
        <RecentChats />
      </Grid>
    </Grid>
  );
};

export default MyChats;
