import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { keyframes } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const categories = [
  {
    id: 1,
    name: 'Calzado',
    image: process.env.PUBLIC_URL + '/assets/shoes-category.png',
    color: '#FF6B6B',
  },
  {
    id: 2,
    name: 'Ropa',
    image: process.env.PUBLIC_URL + '/assets/clothing-category.png',
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: 'Accesorios',
    image: process.env.PUBLIC_URL + '/assets/accessories-category.png',
    color: '#FFD93D',
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Nike Air Max 2024',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    price: '$199.99',
    category: 'Calzado',
    isNew: true,
  },
  {
    id: 2,
    name: 'Nike Dri-FIT Tee',
    image: process.env.PUBLIC_URL + '/assets/drifit-placeholder.png',
    price: '$49.99',
    category: 'Ropa',
    isNew: false,
  },
  {
    id: 3,
    name: 'Nike Sportswear Club Fleece',
    image: process.env.PUBLIC_URL + '/assets/fleece-placeholder.png',
    price: '$89.99',
    category: 'Ropa',
    isNew: true,
  },
  {
    id: 4,
    name: 'Nike Air Force 1',
    image: process.env.PUBLIC_URL + '/assets/airforce-placeholder.png',
    price: '$129.99',
    category: 'Calzado',
    isNew: false,
  },
];

const Discover: React.FC = () => {
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <Box sx={{ bgcolor: '#F7F7F7', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 3, 
        pt: 3, 
        pb: 1,
        position: 'sticky',
        top: 0,
        bgcolor: '#F7F7F7',
        zIndex: 1000,
      }}>
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
          Descubrir
        </Typography>
        <Box flex={1} />
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <ShoppingBagIcon />
        </IconButton>
      </Box>

      {/* Hero Banner */}
      <Box sx={{ px: 3, mt: 2, mb: 4 }}>
        <Card sx={{ 
          borderRadius: 4, 
          boxShadow: 3, 
          bgcolor: '#111', 
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          animation: `${fadeIn} 1s ease-in`,
        }}>
          <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Nueva Colección
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Descubre lo último en innovación y estilo
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ 
                borderRadius: 3,
                fontWeight: 700,
                px: 4,
              }}
            >
              Explorar
            </Button>
          </Box>
          <Box
            component="img"
            src={process.env.PUBLIC_URL + '/assets/hero-banner.png'}
            alt="Hero Banner"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '50%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.8,
            }}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/hero-banner-placeholder.png';
            }}
          />
        </Card>
      </Box>

      {/* Categories */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
          Categorías
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={4} key={category.id}>
              <Card 
                sx={{ 
                  borderRadius: 3,
                  bgcolor: category.color,
                  color: '#fff',
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {category.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Products */}
      <Box sx={{ px: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
          Productos Destacados
        </Typography>
        <Grid container spacing={2}>
          {featuredProducts.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: 2,
                animation: `${slideUp} 0.5s ease-out`,
              }}>
                <Box sx={{ position: 'relative' }}>
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
                  {product.isNew && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: '#FF6B6B',
                        color: '#fff',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      NUEVO
                    </Box>
                  )}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <FavoriteIcon sx={{ color: '#FF6B6B' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Discover; 