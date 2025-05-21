import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';

const reverseColors = [
  { name: 'Light Grey', hex: theme.palette.grey[100] },
  { name: 'Black', hex: theme.palette.grey[900] },
  { name: 'Orange', hex: theme.palette.secondary.main },
  { name: 'White', hex: theme.palette.common.white },
  { name: 'Green', hex: theme.palette.primary.main },
];

const ReverseAssets: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.palette.background.paper, color: theme.palette.text.primary, p: 4, borderRadius: 4, mt: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: theme.typography.h3.fontFamily }}>
        Reverse brand assets
      </Typography>
      <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
        <img src="/assets/images/logos/reverse-logo-white.png" alt="Reverse Logo White" style={{ height: 60, background: theme.palette.grey[900], borderRadius: 8 }} />
        <img src="/assets/images/logos/reverse-logo-black.png" alt="Reverse Logo Black" style={{ height: 60, background: theme.palette.common.white, borderRadius: 8 }} />
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
        <span style={{ fontFamily: theme.typography.h3.fontFamily, fontWeight: 700 }}>Oswald</span> / <span style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Poppins</span>
      </Typography>
    </Box>
  );
};

export default ReverseAssets; 