import React from 'react';
import { Box } from '@mui/material';
import BrandAssets from '../../components/BrandAssets/BrandAssets';
import TShirtGallery from '../../components/TShirtGallery/TShirtGallery';
import BottomNav from '../../components/BottomNav/BottomNav';

const Home: React.FC = () => (
  <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10 }}>
    <BrandAssets />
    <TShirtGallery />
    <BottomNav />
  </Box>
);

export default Home; 