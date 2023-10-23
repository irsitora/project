import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackNav() {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={12} sx={{ m: '1em 0' }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
      </IconButton>
    </Grid>
  );
}

export default BackNav;
