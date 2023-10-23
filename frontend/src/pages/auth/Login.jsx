import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginImg from '../../assets/authPage/login.png';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import { CustomButtonTwo } from '../../components/customUtils/customButtons/CustomButtonOne';
import { FormBottomLinksLoginPage } from '../../components/formBottomLinks/FormBottomLinks';
import { validateEmail } from '../../redux/features/auth/authServices';
import {
  RESET,
  login,
  loginWithGoogle,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const { t, i18n } = useTranslation();
  // ! ------ Yup Validation ------------------
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('authAlert.validEmail')}`)
      .required(`${t('authAlert.required')}`),
    password: Yup.string().required(`${t('authAlert.required')}`),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isLoggedIn,
    isSuccess,
    message,
    isError,
    towFactors,
    user,
  } = useSelector((state) => state.auth);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ! --------------------------------------------
  // ! can use this handleChange while not using formik

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! --------------------------------------------
  const LoginUser = async (e) => {
    if (!email || !password) {
      return toast.error('All field are required!');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email', {});
    }
    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  // ! ---- Google Login -----------------------

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  // ! --------------------------------------------
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }
    if (isError && towFactors) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch, isError, towFactors, email]);

  // ! --------------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      LoginUser(values);
    },
  });

  return (
    <BodyWrapper>
      <Box
        sx={{
          maxWidth: '30rem',
          width: '32rem',
          m: '0 auto',
          p: '1em 2em',
          bgcolor: 'form.main',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            p: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={loginImg} alt='login' />
          <Typography sx={{ color: 'primary.main', ml: '0.4em' }} variant='h3'>
            {`${t('auth.login')}`}
          </Typography>
        </Box>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name='email'
            label={`${t('auth.email')}`}
            type='text'
            variant='outlined'
            value={formik.values.email}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label={`${t('auth.password')}`}
            onChange={handleChange}
            value={formik.values.password}
            style={{ margin: '8px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link to='/forgot'>{`${t('auth.forgot')}`}</Link>
          <Stack my='1em'>
            <CustomButtonTwo label={`${t('auth.login')}`} />
          </Stack>
          <Box sx={{ p: '1.4em' }}>
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log('Login Failed');
                toast.error('Login Failed');
              }}
            />
          </Box>
          <FormBottomLinksLoginPage />
        </form>
      </Box>
    </BodyWrapper>
  );
}

export default Login;
