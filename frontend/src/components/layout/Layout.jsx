import { Box } from '@mui/material';
import React from 'react';
import Header from '../Header';

function Layout({ children }) {
  return (
    <Box>
      <Header />
      <div>
        {children}
      </div>
    </Box>
  );
}

export default Layout;
