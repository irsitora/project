import { Player } from '@lottiefiles/react-lottie-player';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HomeAnimation from '../../animations/HomeAnimation.json';
import {
  CustomButtonOne,
  CustomButtonTwo,
} from '../../components/customUtils/customButtons/CustomButtonOne';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>
      <Box className='container hero'>
        <div className='hero-text'>
          <Typography
            variant='h3'
            color='primary.dark'
            textAlign='center'
            mb='0.4em'
          >
            {t('home.title')}
          </Typography>
          <Typography variant='body1' color='primary.dark'>
            {t('home.desc')}
          </Typography>
          <Box textAlign='center' mt='1.4em'>
            <CustomButtonTwo
              onClick={() => navigate('/login')}
              label={t('button.login')}
            />

            <CustomButtonOne
              onClick={() => navigate('/register')}
              label={t('button.register')}
            />
          </Box>
        </div>

        <div className='hero-image'>
          <Player
            autoplay
            loop
            src={HomeAnimation}
            style={{ height: '340px' }}
          />
        </div>
      </Box>
    </Box>
  );
}

export default Home;
