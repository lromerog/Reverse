import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
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

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#232323',
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
        }}
      />
    </Box>
  );
};

export default Splash; 