import React from 'react';
import { Box } from '@mui/material';
import ReverseAssets from '../../components/ReverseAssets/ReverseAssets';
import TShirtGallery from '../../components/TShirtGallery/TShirtGallery';
import BottomNav from '../../components/BottomNav/BottomNav';

const Reverse: React.FC = () => (
  <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10 }}>
    <ReverseAssets />
    <TShirtGallery />
    <BottomNav />
  </Box>
);

export default Reverse; 