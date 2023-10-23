import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ImProfile } from 'react-icons/im';
import PasswordStrength from '../../passwordStrength/PasswordStrength';
import {t} from 'i18next';

function PersonalInformation(props) {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    password,
    password2,
    errors,
    handleImageChange,
  } = props;
  // ! -----------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // ! -----------------------

  //   ! Show hide password
  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'menu.main',
            p: '1.2em 0.2em',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            gap: '0.4em',
            ml: '0.4rem',
          }}
        >
          <ImProfile fontSize={26} />
          {t('admin.personalInfo')}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', mb: '1em' }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='name'
            label={t('auth.name')}
            type='text'
            variant='outlined'
            value={values.name}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='phone'
            label={t('auth.phone')}
            variant='outlined'
            type='text'
            value={values.phone}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='email'
            label={t('auth.email')}
            variant='outlined'
            type='email'
            value={values.email}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
      </Grid>
      {/* !------------------------------------- */}
      <Grid
        container
        spacing={2}
        sx={{ display: 'felx', justifyContent: 'left', mb: '1em' }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label={t('auth.password')}
            onChange={handleChange}
            value={values.password}
            style={{ margin: '4px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='password2'
            type={showPassword2 ? 'text' : 'password'}
            label={t('auth.confirm')}
            onChange={handleChange}
            value={values.password2}
            style={{ margin: '4px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword2}>
                    {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={handleBlur}
            error={touched.password2 && Boolean(errors.password2)}
            helperText={touched.password2 && errors.password2}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'center', mb: '1em' }}
      >
        <Grid item xs={12} md={3}>
          <PasswordStrength password={password} password2={password2} />
        </Grid>
      </Grid>
    </>
  );
}

export default PersonalInformation;
