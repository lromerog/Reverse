import React from 'react';
import { Box, Grid } from '@mui/material';

const images = [
  '/assets/tshirt1.png',
  '/assets/tshirt2.png',
  '/assets/tshirt3.png',
  '/assets/tshirt4.png',
  '/assets/tshirt5.png',
];

const TShirtGallery: React.FC = () => (
  <Box sx={{ mt: 4 }}>
    <Grid container spacing={2}>
      {images.map((img, idx) => (
        <Grid item xs={6} sm={4} md={2} key={idx}>
          <Box sx={{ background: '#fff', borderRadius: 2, p: 1 }}>
            <img src={img} alt={`T-shirt ${idx + 1}`} style={{ width: '100%' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default TShirtGallery; 