import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const reverseColors = [
  { name: 'Light Grey', hex: '#E5E5E5' },
  { name: 'Black', hex: '#181818' },
  { name: 'Orange', hex: '#FF4C1E' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Green', hex: '#00C37A' },
];

const ReverseAssets: React.FC = () => (
  <Box sx={{ background: '#232323', color: 'white', p: 4, borderRadius: 4, mt: 4 }}>
    <Typography variant="h3" sx={{ fontWeight: 700 }}>
      Reverse brand assets
    </Typography>
    <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
      <img src="/assets/reverse-logo-white.png" alt="Reverse Logo White" style={{ height: 60, background: '#181818', borderRadius: 8 }} />
      <img src="/assets/reverse-logo-black.png" alt="Reverse Logo Black" style={{ height: 60, background: '#fff', borderRadius: 8 }} />
    </Box>
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {reverseColors.map((c) => (
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

export default ReverseAssets; 