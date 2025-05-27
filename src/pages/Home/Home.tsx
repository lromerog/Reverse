import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BrandAssets from '../../components/BrandAssets/BrandAssets';
import TShirtGallery from '../../components/TShirtGallery/TShirtGallery';
import BottomNav from '../../components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <BrandAssets />
      <Typography variant="h3" color="#fff" fontWeight={700} mb={4} textAlign="center">
        Welcome to Reverse
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<DashboardIcon />}
        sx={{
          borderRadius: 3,
          fontWeight: 700,
          fontSize: 22,
          px: 5,
          py: 2,
          mb: 6,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
        }}
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </Button>
      <TShirtGallery />
      <BottomNav />
    </Box>
  );
};

export default Home; 