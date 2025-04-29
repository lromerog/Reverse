import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        bgcolor: '#fff',
      }}
    >
      {/* Logo Nike (placeholder si no hay imagen) */}
      <Box
        component="img"
        src={process.env.PUBLIC_URL + '/assets/nike-swoosh.png'}
        alt="Nike Logo"
        sx={{ width: 120, height: 120, mb: 3 }}
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';
        }}
      />
      {/* Puedes agregar animación aquí si tu Figma la tiene */}
    </Box>
  );
};

export default Splash; 