import { Button } from '@mui/material';
import React from 'react';

export const CustomButtonOne = (props) => {
  const { label, ...rest } = props;
  return (
    <Button
      type='submit'
      variant='contained'
      sx={{
        borderRadius: '10px',
        padding: '4px 10px',
        fontWeight: '600',
        fontSize: '1rem',
        minWidth: '8rem',
        color: 'primary.dark',
        bgcolor: 'third.main',
        '&:hover': {
          backgroundColor: '#ccb7c0',
          color: '#fff',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export const CustomButtonTwo = (props) => {
  const { label, ...rest } = props;
  return (
    <Button
      type='submit'
      variant='contained'
      sx={{
        borderRadius: '10px',
        padding: '4px 10px',
        fontWeight: '600',
        fontSize: '1rem',
        color: 'primary.dark',
        minWidth: '8rem',
        bgcolor: 'fourth.main',
        mr: '0.4em',
        '&:hover': {
          backgroundColor: '#ccc6b4',
          color: '#fff',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export const CustomButtonLanguage = (props) => {
  const { label, ...rest } = props;
  return (
    <Button
      variant='contained'
      sx={{
        borderRadius: '4px',
        padding: '2px 4px',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'primary.dark',
        minWidth: '4em',
        bgcolor: 'fourth.main',
        textTransform: 'uppercase',
        '&:hover': {
          backgroundColor: '#ccc6b4',
          color: '#fff',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};
