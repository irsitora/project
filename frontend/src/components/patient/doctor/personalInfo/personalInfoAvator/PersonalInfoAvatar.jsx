import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PersonalInfoAvatar(props) {
  const { doctor, handleOpen } = props;
  const navigate = useNavigate();
  return (
    <>
      <Grid container mb='1em'>
        <Grid item xs={10} sm={11} md={11.5}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
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
        </Box>
      </Grid>
    </>
  );
}

export default PersonalInfoAvatar;
