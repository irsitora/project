import { Box, Typography } from '@mui/material';
import {t} from 'i18next';
import React, { useEffect, useState } from 'react';

function LiveDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h5' sx={{ color: 'primary.dark' }}>
          {t('admin.date')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'secondary.dark', ml: '0.5em' }}>
          {currentDateTime.toLocaleDateString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h5' sx={{ color: 'primary.dark' }}>
          {t('admin.time')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'secondary.dark', ml: '0.5em' }}>
          {currentDateTime.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default LiveDate;
