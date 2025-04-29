import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        bgcolor: '#fff',
        px: 2,
      }}
    >
      {/* Logo Nike (placeholder si no hay imagen) */}
      <Box
        component="img"
        src={process.env.PUBLIC_URL + '/assets/nike-swoosh.png'}
        alt="Nike Logo"
        sx={{ width: 100, height: 100, mb: 4 }}
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';
        }}
      />
      <Typography variant="h4" fontWeight={700} mb={2} align="center">
        ¡Bienvenido a Nike Rewards!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={5} align="center">
        Descubre productos exclusivos y gana recompensas por tus compras.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', maxWidth: 320, mb: 2, borderRadius: 3, fontWeight: 700, fontSize: 18 }}
        onClick={() => navigate('/signup')}
      >
        Crear cuenta
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: '100%', maxWidth: 320, borderRadius: 3, fontWeight: 700, fontSize: 18 }}
        onClick={() => navigate('/login')}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
};

export default Welcome; 