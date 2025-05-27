import React from 'react';
import { Box, Typography } from '@mui/material';
import BottomNav from '../../components/BottomNav/BottomNav';

const QRScanner: React.FC = () => (
  <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10 }}>
    <Typography variant="h3" color="white" sx={{ mt: 8 }}>Escanear QR</Typography>
    {/* Aquí puedes integrar una librería de escaneo QR */}
    <Box sx={{ mt: 4, color: 'white' }}>[Componente de escaneo QR aquí]</Box>
    <BottomNav />
  </Box>
);

export default QRScanner; 