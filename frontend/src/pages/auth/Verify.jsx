import { Box, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomButtonTwo } from '../../components/customUtils/customButtons/CustomButtonOne';
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';

function Verify() {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  // console.log(verificationToken);

  const verifyUserAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <Box
      sx={{
        bgcolor: 'form.main',
        p: '2em 1em',
        m: '4em auto',
        maxWidth: '36rem',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Typography variant='h4' sx={{ textAlign: 'center', color: 'btn.main' }}>
        {t('auth.verification')}
      </Typography>
      <Typography variant='h6' sx={{ color: 'btnAlert.main' }}>
        {t('auth.verificationDetails')}
      </Typography>
      <br />

      <Stack  width='15rem' m='1em auto'>
        <CustomButtonTwo
          onClick={verifyUserAccount}
          label={`${t('auth.verificationBtn')}`}
        />
      </Stack>
    </Box>
  );
}

export default Verify;
