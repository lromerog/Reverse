import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#E5E5E5',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 380,
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo Nike en la parte superior */}
        <Box
          component="img"
          src={process.env.PUBLIC_URL + '/assets/nike-swoosh.png'}
          alt="Nike Logo"
          sx={{ width: 60, height: 60, mb: 2 }}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';
          }}
        />
        <MarkEmailReadRoundedIcon sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} mb={1} align="center">
          ¡Verifica tu correo!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3} align="center">
          Te enviamos un enlace para verificar tu cuenta. Revisa tu bandeja de entrada y sigue las instrucciones.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, mb: 2 }}
          onClick={() => alert('Correo de verificación reenviado')}
        >
          Reenviar correo
        </Button>
        <Link component="button" onClick={() => navigate('/login')} underline="hover" color="primary">
          Volver a iniciar sesión
        </Link>
      </Box>
    </Box>
  );
};

export default VerifyEmail; 