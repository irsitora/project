import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { t } from 'i18next';
import { AiFillDelete } from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../PersonalInfo.css';

function PersonalInfoAvatar(props) {
  const { doctor, formattedDate, handleOpen } = props;
  const navigate = useNavigate();
  return (
    <>
      <Grid container>
        <Grid item xs={10} md={11.5}>
          <IconButton onClick={() => navigate('/admin/doctors')}>
            <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
          </IconButton>
        </Grid>
        <Grid item xs={2} md={0.5}>
          <IconButton onClick={() => handleOpen()}>
            <AiFillDelete fontSize={24} color='red' />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.4em',
            mb: '1em',
          }}
        >
          <img
            className='doctor-profile-img'
            src={doctor?.photo}
            alt={doctor?.name}
          />
          <Box sx={{ textAlign: 'center' }}>
            {doctor?.isVerified ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <GoVerified
                  fontSize={20}
                  color='green'
                  style={{ marginRight: '0.2em' }}
                />
                <Typography variant='h6' sx={{ color: 'green' }}>
                  {t('admin.verified')}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <RiErrorWarningLine
                  fontSize={20}
                  color='red'
                  style={{ marginRight: '0.2rem' }}
                />
                <Typography variant='h6' sx={{ color: 'red' }}>
                  {t('admin.notVerified')}
                </Typography>
              </Box>
            )}
          </Box>
          <Typography
            variant='body1'
            sx={{ color: 'secondary.dark', ml: '1em' }}
          >{`${t('admin.createdAt')} ${formattedDate}`}</Typography>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalInfoAvatar;
