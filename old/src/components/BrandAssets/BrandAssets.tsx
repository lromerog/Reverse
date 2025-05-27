import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const colors = [
  { name: 'Light Grey', hex: '#E5E5E5' },
  { name: 'Black', hex: '#181818' },
  { name: 'Orange', hex: '#FF4C1E' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Green', hex: '#00C37A' },
];

const BrandAssets: React.FC = () => (
  <Box sx={{ background: '#232323', color: 'white', p: 4, borderRadius: 4 }}>
    <Typography variant="h3" sx={{ fontWeight: 700 }}>
      just<span style={{ color: '#00C37A' }}>Recycle</span> brand assets
    </Typography>
    <Box sx={{ my: 2 }}>
      {/* Cambia la ruta por la de tu logo */}
      <img src="/assets/justrecycle-logo.png" alt="Logo" style={{ height: 60 }} />
    </Box>
    <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Reverse brand assets</Typography>
    <Grid container spacing={2}>
      {colors.map((c) => (
        <Grid item key={c.hex}>
          <Box sx={{ width: 40, height: 40, background: c.hex, borderRadius: 2, mb: 1 }} />
          <Typography variant="body2">{c.name}</Typography>
        </Grid>
      ))}
    </Grid>
    <Typography sx={{ mt: 4 }}>
      <span style={{ fontFamily: 'Futura, Poppins, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Futura</span> / <span style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Poppins</span>
    </Typography>
  </Box>
);

export default BrandAssets; 