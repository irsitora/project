import { Box, Typography } from '@mui/material';
import React from 'react';
import './FormWrapper.css';

function FormWrapper(props) {
  const { title, img, altImg } = props;
  return (
    <>
      <Box
        sx={{
          bgcolor: 'form.main',
          width: '96%',
          maxWidth: '110rem',
          m: '2em auto',
          p: '2em 2em',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          // gap: '0.5em',
        }}
      >
        {img ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={img} alt={altImg} className='add-new-doctor-logo' />
              <Typography
                variant='h4'
                sx={{ color: 'primary.main', p: '0.2em', fontWeight: '800' }}
              >
                {title}
              </Typography>
            </Box>
            {props.children}
          </>
        ) : (
          <>{props.children}</>
        )}
      </Box>
    </>
  );
}

export default FormWrapper;
