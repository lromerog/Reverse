import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';

const featuredProducts = [
  {
    id: 1,
    name: 'Nike Air Max 2024',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    points: 120,
  },
  {
    id: 2,
    name: 'Nike Dri-FIT Tee',
    image: process.env.PUBLIC_URL + '/assets/drifit-placeholder.png',
    points: 60,
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F7F7F7', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, pt: 3, pb: 1 }}>
        <Box
          component="img"
          src={process.env.PUBLIC_URL + '/assets/nike-swoosh.png'}
          alt="Nike Logo"
          sx={{ width: 40, height: 40, mr: 2 }}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';
          }}
        />
        <Typography variant="h6" fontWeight={700} color="text.primary">
          ¡Hola, Usuario!
        </Typography>
      </Box>

      {/* Reward Card */}
      <Box sx={{ px: 3, mt: 2, mb: 4 }}>
        <Card sx={{ borderRadius: 4, boxShadow: 3, bgcolor: '#111', color: '#fff', p: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#fff', color: '#111', width: 56, height: 56, mr: 2 }}>
              <StarIcon sx={{ color: '#F5B301', fontSize: 36 }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="#F5B301" fontWeight={700}>
                Tus Puntos
              </Typography>
              <Typography variant="h4" fontWeight={700} color="#fff">
                1,250
              </Typography>
            </Box>
            <Box flex={1} />
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, fontWeight: 700, ml: 2 }}
              onClick={() => navigate('/rewards')}
            >
              Ver Recompensas
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Featured Products */}
      <Box sx={{ px: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
          Productos destacados
        </Typography>
        <Grid container spacing={2}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} key={product.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: 6 } }} onClick={() => navigate('/products/' + product.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/airmax-placeholder.png';
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.points} puntos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Discover Button */}
      <Box sx={{ px: 3, mt: 5, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, px: 5, py: 1.5 }}
          onClick={() => navigate('/discover')}
        >
          Descubrir más productos
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard; 