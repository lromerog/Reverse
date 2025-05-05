import React from 'react';
import { Box, Container } from '@mui/material';
import ReverseAssets from '../../components/ReverseAssets/ReverseAssets';
import TShirtGallery from '../../components/TShirtGallery/TShirtGallery';
import BottomNav from '../../components/BottomNav/BottomNav';

const Reverse: React.FC = () => (
  <Box sx={{ background: '#232323', minHeight: '100vh', pb: 10 }}>
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box 
        component="img"
        src="/logo.png"
        alt="Reverse Logo"
        sx={{
          width: '100%',
          maxWidth: '200px',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          mb: 3
        }}
      />
    </Container>
    <Box sx={{ p: 4 }}>
      <ReverseAssets />
      <TShirtGallery />
    </Box>
    <BottomNav />
  </Box>
);

export default Reverse; 