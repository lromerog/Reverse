import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { QuickActionButton } from '../../components';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const menuItems = [
  'Home',
  'Men',
  'Women',
  'Kids',
  'Collections',
  'Sustainability',
  'Stores'
];

const sneakerImages = [
  '/assets-reverse/assets/Untitled design (1) 2.png',
  '/assets-reverse/assets/Untitled design (2) 2.png',
  '/assets-reverse/assets/Untitled design (5) 2.png',
  '/assets-reverse/assets/Untitled design (6) 2.png',
  '/assets-reverse/assets/Rectangle-1.png',
  '/assets-reverse/assets/Rectangle-2.png',
  '/assets-reverse/assets/Rectangle-3.png',
  '/assets-reverse/assets/Rectangle.png',
];

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2, borderBottom: '1px solid #eee', position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/logo.png" alt="Reverse Logo" style={{ height: 36, width: 'auto', marginRight: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 2, color: '#232323' }}>NIKE</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {menuItems.map(item => (
            <Button key={item} sx={{ color: '#232323', fontWeight: 500, fontSize: 16, textTransform: 'none' }}>{item}</Button>
          ))}
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 8 }, py: 6, bgcolor: '#f5f5f5', gap: 6 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#232323', mb: 2, fontSize: { xs: 32, md: 48 } }}>
            Give Your Sneakers a Second Life
          </Typography>
          <Typography variant="h5" sx={{ color: '#636e72', mb: 4, fontWeight: 400 }}>
            Recycle your old Nike sneakers and get exclusive rewards. Join the movement for a more sustainable future.
          </Typography>
          <QuickActionButton
            variant="primary"
            size="large"
            icon={<img src="/logo.png" alt="Reverse Logo" style={{ height: 32, width: 'auto' }} />}
            onClick={() => navigate('/demo')}
            sx={{
              bgcolor: '#F5B301',
              color: '#232323',
              fontWeight: 'bold',
              fontSize: 20,
              py: 2,
              px: 4,
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(245,179,1,0.10)',
              '&:hover': { bgcolor: '#E5A301' },
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            Enter Reverse
          </QuickActionButton>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/assets-reverse/assets/Untitled design (1) 2.png" alt="Hero Sneaker" style={{ width: '100%', maxWidth: 420, borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }} />
        </Box>
      </Box>

      {/* Promotions Section */}
      <Box sx={{ px: { xs: 2, md: 8 }, py: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1, bgcolor: '#232323', color: '#fff', borderRadius: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Recycle & Save</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Bring your old sneakers and get up to <b>20% off</b> your next purchase.</Typography>
          <Button variant="outlined" sx={{ color: '#F5B301', borderColor: '#F5B301', fontWeight: 600, borderRadius: 2 }}>Learn More</Button>
        </Box>
        <Box sx={{ flex: 1, bgcolor: '#F5B301', color: '#232323', borderRadius: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(245,179,1,0.10)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>New Recycled Collection</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Discover our latest sneakers made from recycled materials.</Typography>
          <Button variant="outlined" sx={{ color: '#232323', borderColor: '#232323', fontWeight: 600, borderRadius: 2 }}>Shop Now</Button>
        </Box>
        <Box sx={{ flex: 1, bgcolor: '#fff', color: '#232323', borderRadius: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Sustainability</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Learn how Nike is working towards a zero-waste future.</Typography>
          <Button variant="outlined" sx={{ color: '#F5B301', borderColor: '#F5B301', fontWeight: 600, borderRadius: 2 }}>Read More</Button>
        </Box>
      </Box>

      {/* Sneaker Gallery */}
      <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#232323' }}>Featured Recycled Sneakers</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
          {sneakerImages.map((img, idx) => (
            <Box key={idx} sx={{ bgcolor: '#f5f5f5', borderRadius: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <img src={img} alt={`Sneaker ${idx + 1}`} style={{ width: '100%', maxWidth: 180, borderRadius: 8, marginBottom: 12 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#232323' }}>Recycled Sneaker #{idx + 1}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Reverse Banner */}
      <Box sx={{ px: { xs: 2, md: 8 }, py: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#232323', borderRadius: 4, mx: { xs: 2, md: 8 }, my: 6, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#F5B301', fontWeight: 800, mb: 2 }}>
            Discover Reverse
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
            Recycle your sneakers, earn rewards, and track your impact. Join Reverse now!
          </Typography>
          <QuickActionButton
            variant="primary"
            size="large"
            icon={<img src="/logo.png" alt="Reverse Logo" style={{ height: 32, width: 'auto' }} />}
            onClick={() => navigate('/demo')}
            sx={{
              bgcolor: '#F5B301',
              color: '#232323',
              fontWeight: 'bold',
              fontSize: 20,
              py: 2,
              px: 4,
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(245,179,1,0.10)',
              '&:hover': { bgcolor: '#E5A301' },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mx: 'auto'
            }}
          >
            Enter Reverse
          </QuickActionButton>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#232323', color: '#fff', py: 4, px: { xs: 2, md: 8 }, mt: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/logo.png" alt="Reverse Logo" style={{ height: 28, width: 'auto' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 2, color: '#fff' }}>NIKE</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <QuickActionButton variant="outline" sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}>About</QuickActionButton>
            <QuickActionButton variant="outline" sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}>Contact</QuickActionButton>
            <QuickActionButton variant="outline" sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}>Sustainability</QuickActionButton>
            <QuickActionButton variant="outline" sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}>Terms</QuickActionButton>
            <QuickActionButton variant="outline" sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none' }}>Privacy</QuickActionButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: '#bbb', mt: 2, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Nike. All rights reserved. This is a demo for Reverse.
        </Typography>
      </Box>
    </Box>
  );
};

export default Welcome; 