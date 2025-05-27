import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica real de login
    navigate('/dashboard');
  };

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
        <Typography variant="h5" fontWeight={700} mb={2} align="center">
          Iniciar sesión
        </Typography>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, borderRadius: 3, fontWeight: 700, fontSize: 18 }}
          >
            Iniciar sesión
          </Button>
        </form>
        <Typography variant="body2" color="text.secondary" mt={2}>
          ¿No tienes cuenta?{' '}
          <Link component="button" onClick={() => navigate('/signup')} underline="hover">
            Crear cuenta
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login; 