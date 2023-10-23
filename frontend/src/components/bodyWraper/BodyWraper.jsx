import { Box } from '@mui/material';

function BodyWrapper({ children, cardclass }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export default BodyWrapper;
