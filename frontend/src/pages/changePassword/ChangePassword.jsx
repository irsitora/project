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
import { t } from 'i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import chnagePasswordIcon from '../../assets/authPage/changePassword.png';
import { CustomButtonTwo } from '../../components/customUtils/customButtons/CustomButtonOne';
import PasswordStrength from '../../components/passwordStrength/PasswordStrength';
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser';
import {
  RESET,
  changePassword,
  logout,
} from '../../redux/features/auth/authSlice';
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice';

const initialValues = {
  oldPassword: '',
  password: '',
  password2: '',
};

function ChangePassword() {
  useRedirectLoggedOutUser('/login');
  const [formData, setFormData] = useState(initialValues);
  const { oldPassword, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  // ! ------ Yup Validation ------------------
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(
      `${t('changePassword.oldPasswordRequired')}`
    ),
    password: Yup.string()
      .min(6, `${t('changePassword.atLeast')}`)
      .required(`${t('changePassword.required')}`),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], `${t('changePassword.mustMatch')}`)
      .required(`${t('changePassword.confirm')}`),
  });

  // ! ---- handleInputChange ------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! --- updatePassword function -----------
  const updatePassword = async () => {
    if (!oldPassword || !password || !password2) {
      return toast.error('All fields are required');
    }
    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: `${t('changePassword.passwordChanged')}`,
      send_to: user.email,
      reply_to: 'noreply@admin',
      template: 'changePassword',
      url: '/forgot',
    };
    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate('/login');
  };

  // ! -------------------------------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      updatePassword(values);
    },
  });
  // ! -------------------------
  return (
    <>
      <Box
        sx={{
          maxWidth: '40rem',
          width: '31rem',
          m: '2em auto',
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
          <img src={chnagePasswordIcon} alt='changePassword' />
          <Typography sx={{ color: 'primary.main', ml: '0.4em' }} variant='h4'>
            {t('changePassword.changePassTitle')}
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
            name='oldPassword'
            type={showOldPassword ? 'text' : 'password'}
            label={`${t('changePassword.oldPassword')}`}
            onChange={handleChange}
            value={formik.values.oldPassword}
            style={{ margin: '8px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleOldPassword}>
                    {showOldPassword ? (
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
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label={`${t('changePassword.newPassword')}`}
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
            label={`${t('changePassword.confirmPassword')}`}
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
            <CustomButtonTwo label={`${t('changePassword.updatePassword')}`} />
          </Stack>
          <PasswordStrength password={password} password2={password2} />
        </form>
      </Box>
    </>
  );
}
export default ChangePassword;
