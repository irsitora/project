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
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './auth-mui-overwrited.css';

import { useTranslation } from 'react-i18next';
import RegisterImg from '../../assets/authPage//register.png';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import { CustomButtonOne } from '../../components/customUtils/customButtons/CustomButtonOne';
import { FormBottomLinksRegisterPage } from '../../components/formBottomLinks/FormBottomLinks';
import PasswordStrength from '../../components/passwordStrength/PasswordStrength';
import {
  register,
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';

const initialValues = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const Register = () => {
  const { t, i18n } = useTranslation();
  // ! Initial Values for form
  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // ! ------ Yup Validation ------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`${t('authAlert.required')}`),
    email: Yup.string()
      .email(`${t('authAlert.validEmail')}`)
      .required(`${t('authAlert.required')}`),
    password: Yup.string()
      .min(6, `${t('authAlert.password')}`)
      .required(`${t('authAlert.required')}`),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], `${t('authAlert.passwordsMatch')}`)
      .required(`${t('authAlert.required')}`),
  });

  // ! ------------------------------------------

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

  // ! ---- Register function ----------------

  const RegisterUser = async () => {
    // e.preventDefault();
    // if (!name || !email || !password) {
    //   return toast.error('All field are required!');
    // }
    // if (password.length < 6) {
    //   return toast.error('Password must be up to 6 characters');
    // }
    // if (!validateEmail(email)) {
    //   return toast.error('Please enter a valid email');
    // }
    // if (password !== password2) {
    //   return toast.error('Password did not match');
    // }
    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  // ! --------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      RegisterUser(values);
    },
  });

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
        <Box
          className='register--box'
          sx={{
            p: '1.6em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={RegisterImg} alt='login' />
          <Typography sx={{ color: 'primary.main', ml: '0.4em' }} variant='h3'>
            {t('auth.registerTitle')}
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
            name='name'
            label={t('auth.name')}
            type='text'
            variant='outlined'
            value={formik.values.name}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            name='email'
            label={t('auth.email')}
            variant='outlined'
            type='email'
            value={formik.values.email}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {/* ! Added Show and Hide Password */}
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label={t('auth.password')}
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
          <TextField
            name='password2'
            type={showPassword2 ? 'text' : 'password'}
            label={t('auth.confirm')}
            onChange={handleChange}
            value={formik.values.password2}
            style={{ margin: '8px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword2}>
                    {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
          <Stack my='1em'>
            <CustomButtonOne
              label={t('auth.register')}
              disabled={formik.isSubmitting}
            />
          </Stack>
          <PasswordStrength password={password} password2={password2} />
          <FormBottomLinksRegisterPage />
        </form>
      </Box>
    </BodyWrapper>
  );
};

export default Register;
