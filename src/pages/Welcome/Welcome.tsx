import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';

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

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#232323',
        p: 3,
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        alt="Reverse Logo"
        sx={{
          width: 200,
          height: 'auto',
          animation: `${fadeInScale} 1.5s ease-out forwards`,
          mb: 4
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: '#fff',
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold'
        }}
      >
        Welcome to Reverse
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/signup')}
        sx={{
          width: '100%',
          maxWidth: 300,
          mb: 2,
          bgcolor: '#F5B301',
          '&:hover': {
            bgcolor: '#E5A301',
          },
        }}
      >
        Get Started
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => navigate('/login')}
        sx={{
          width: '100%',
          maxWidth: 300,
          color: '#fff',
          borderColor: '#fff',
          '&:hover': {
            borderColor: '#F5B301',
            color: '#F5B301',
          },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default Welcome; 