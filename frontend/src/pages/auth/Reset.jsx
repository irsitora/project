import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Loader from '../../components/loader/Loader';
import { RESET, resetPassword } from '../../redux/features/auth/authSlice';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik';
import resetImg from '../../assets/authPage/reset-password.png';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import { CustomButtonOne } from '../../components/customUtils/customButtons/CustomButtonOne';
import { FormBottomLinks } from '../../components/formBottomLinks/FormBottomLinks';
import PasswordStrength from '../../components/passwordStrength/PasswordStrength';
import {t} from 'i18next';

const initialValues = {
  password: '',
  password2: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Reset() {
  const [formData, setFormData] = useState(initialValues);
  const { password, password2 } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { isLoading, message, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! ----- Reset Function -----------------------

  const reset = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error('Password do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must to be up to 6 characters');
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    await dispatch(RESET(userData));
    navigate('/login');
  };

  // ! -----------------------------------------

  useEffect(() => {
    if (isSuccess && message.includes('Reset Successful')) {
      navigate('/login');
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  // ! --------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      reset(values);
    },
  });

  // ! ---------------------------------------
  return (
    <BodyWrapper>
      {isLoading ? (
        <Loader />
      ) : (
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
          <Box>
            <Box
              sx={{
                p: '1.6em',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={resetImg} alt='login' />
              <Typography
                sx={{ color: 'primary.main', ml: '0.4em' }}
                variant='h4'
              >
                {t('auth.resetPassword')}
              </Typography>
            </Box>
            <form onSubmit={reset} noValidate>
              <TextField
                name='password'
                type={showPassword ? 'text' : 'password'}
                label={`${t('auth.password')}`}
                onChange={handleChange}
                value={formik.values.password}
                style={{ margin: '8px 0', width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={togglePassword}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                name='password2'
                type={showPassword2 ? 'text' : 'password'}
                label={`${t('auth.confirm')}`}
                onChange={handleChange}
                value={formik.values.password2}
                style={{ margin: '8px 0', width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={togglePassword2}>
                        {showPassword2 ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
              />
              <Box textAlign='center' my='1em'>
                <CustomButtonOne label={`${t('auth.resetPassword')}`} />
              </Box>
              <PasswordStrength password={password} password2={password2} />
              <FormBottomLinks />
            </form>
          </Box>
        </Box>
      )}
    </BodyWrapper>
  );
}

export default Reset;
