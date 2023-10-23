import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import passCode from '../../assets/authPage/password-code.png';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import { CustomButtonTwo } from '../../components/customUtils/customButtons/CustomButtonOne';
import Loader from '../../components/loader/Loader';
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';

function LoginWithCode() {
  const { t, i18n } = useTranslation();
  const [loginCode, setLoginCode] = useState('');
  const { email } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  // ! ------ Login Function ---------------------
  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === '') {
      return toast.error('Please enter access code');
    }
    if (loginCode.length !== 6) {
      return toast.error('Access code must be 6 characters');
    }
    const code = {
      loginCode,
    };
    await dispatch(loginWithCode({ code, email }));
  };

  // ! ------- Resend Login -------------------
  const resendUserLoginCode = async (e) => {
    e.preventDefault();
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <BodyWrapper>
      <Box
        sx={{
          maxWidth: '30rem',
          width: '32rem',
          minheight: '68vh',
          m: '0 auto',
          p: '0.5em 2em',
          bgcolor: 'form.main',
          borderRadius: '10px',
        }}
      >
        {isLoading && <Loader />}
        <Box sx={{ margin: '0 auto', p: '2em 1em' }}>
          <Box sx={{ textAlign: 'center' }}>
            <img src={passCode} alt='passCode' />
          </Box>
          <Typography
            variant='h4'
            sx={{ color: 'primary.main', textAlign: 'center', pb: '0.6em' }}
          >
            {t('auth.enterAccessCode')}
          </Typography>

          <form onSubmit={loginUserWithCode} noValidate>
            <TextField
              type='text'
              placeholder='Access Code'
              required
              name='loginCode'
              style={{ width: '100%' }}
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack my='1em'>
                <CustomButtonTwo label={`${t('auth.login')}`} />
              </Stack>
              <Typography sx={{ color: 'orange' }}>
                {t('auth.resendAccessCode')}
              </Typography>
            </Box>
            <Divider sx={{ p: '0.6em' }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: ' center',
              }}
            >
              <Link to='/'>
                <IconButton>
                  <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
                </IconButton>
              </Link>
              <Typography
                sx={{ color: 'primary.main' }}
                variant='h6'
                onClick={resendUserLoginCode}
              >
                <b>{t('auth.resendBtn')}</b>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </BodyWrapper>
  );
}

export default LoginWithCode;
