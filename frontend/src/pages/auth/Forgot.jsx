import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import forgotImg from '../../assets/authPage/forgotPassword.png';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import { CustomButtonTwo } from '../../components/customUtils/customButtons/CustomButtonOne';
import Loader from '../../components/loader/Loader';
import { validateEmail } from '../../redux/features/auth/authServices';
import { RESET, forgotPassword } from '../../redux/features/auth/authSlice';

function Forgot() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();

  // ! ------ Forgot Function ----------------------
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error(t('authAlert.required'));
    }
    if (!validateEmail(email)) {
      return toast.error(t('authAlert.validEmail'));
    }
    const userData = {
      email,
    };
    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };

  // ! ----------------------------------------
  return (
    <BodyWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            maxWidth: '30rem',
            width: '32rem',
            m: '0 auto',
            p: '1em 2em',
            bgcolor: 'form.main',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: '1.6em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={forgotImg} alt='forgotImg' />
            <Typography
              sx={{ color: 'primary.main', ml: '0.4em' }}
              variant='h4'
            >
              {t('auth.forgot')}
            </Typography>
          </Box>
          <form
            onSubmit={forgot}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              type='email'
              placeholder={`${t('auth.email')}`}
              required
              name='email'
              value={email}
              style={{ margin: '8px', width: '100%' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack my='1em'>
              <CustomButtonTwo label={t('auth.getEmail')} />
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0.4em',
              }}
            >
              <Link to='/'>
                <IconButton>
                  <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
                </IconButton>
              </Link>

              <Link to='/register'>
                <IconButton>
                  <PersonAddAltIcon
                    fontSize='large'
                    sx={{ color: 'primary.main' }}
                  />
                </IconButton>
              </Link>
              <Link to='/login'>
                <IconButton>
                  <LoginIcon fontSize='large' sx={{ color: 'primary.main' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </Box>
      )}
    </BodyWrapper>
  );
}

export default Forgot;
