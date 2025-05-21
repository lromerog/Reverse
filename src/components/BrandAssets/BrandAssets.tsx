import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card } from '../index';

const BrandContainer = styled(Card)(({ theme }) => ({
  background: '#232323',
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)'
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  '& img': {
    height: 60,
    transition: 'filter 0.2s ease',
    '&:hover': {
      filter: 'brightness(1.1)'
    }
  }
}));

const ColorBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  }
}));

const colors = [
  { name: 'Light Grey', hex: '#E5E5E5' },
  { name: 'Black', hex: '#181818' },
  { name: 'Orange', hex: '#FF4C1E' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Green', hex: '#00C37A' },
];

const BrandAssets: React.FC = () => {
  const theme = useTheme();

  return (
    <BrandContainer variant="outlined" animation="fade">
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #fff 30%, #00C37A 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}
      >
        just<span style={{ color: '#00C37A' }}>Recycle</span> brand assets
      </Typography>

      <LogoContainer>
        <img src="/assets/images/justrecycle-logo.png" alt="Logo" />
      </LogoContainer>

      <Typography 
        variant="h4" 
        sx={{ 
          mt: 4, 
          mb: 3,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        Brand Colors
      </Typography>

      <Grid container spacing={3}>
        {colors.map((color) => (
          <Grid item key={color.hex}>
            <ColorBox 
              sx={{ 
                background: color.hex,
                border: color.hex === '#FFFFFF' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500
              }}
            >
              {color.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                display: 'block',
                mt: 0.5
              }}
            >
              {color.hex}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Typography 
        sx={{ 
          mt: 4,
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: theme.spacing(1),
          display: 'inline-block'
        }}
      >
        <span style={{ 
          fontFamily: 'Futura, Poppins, Arial, Helvetica, sans-serif', 
          fontWeight: 700,
          color: '#00C37A'
        }}>
          Futura
        </span>
        {' / '}
        <span style={{ 
          fontFamily: 'Poppins', 
          fontWeight: 600,
          color: '#fff'
        }}>
          Poppins
        </span>
      </Typography>
    </BrandContainer>
  );
};

export default BrandAssets; 