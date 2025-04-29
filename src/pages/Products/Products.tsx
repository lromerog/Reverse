import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';

const productImages = [
  process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
  process.env.PUBLIC_URL + '/assets/airmax-detail-1.png',
  process.env.PUBLIC_URL + '/assets/airmax-detail-2.png',
  process.env.PUBLIC_URL + '/assets/airmax-detail-3.png',
];

const sizes = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10'];

const relatedProducts = [
  {
    id: 1,
    name: 'Nike Air Max 2023',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    price: '$179.99',
  },
  {
    id: 2,
    name: 'Nike Air Max Plus',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    price: '$159.99',
  },
  {
    id: 3,
    name: 'Nike Air Max 270',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    price: '$149.99',
  },
];

const Products: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box flex={1} />
        <IconButton onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? (
            <FavoriteIcon sx={{ color: '#FF6B6B' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton>
          <ShoppingBagIcon />
        </IconButton>
      </Box>

      {/* Product Images */}
      <Box sx={{ px: 3, mt: 2 }}>
        <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
          <Box
            component="img"
            src={productImages[selectedImage]}
            alt="Product"
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'contain',
              bgcolor: '#fff',
            }}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/airmax-placeholder.png';
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', pb: 1 }}>
          {productImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Product ${index + 1}`}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'contain',
                bgcolor: '#fff',
                borderRadius: 2,
                cursor: 'pointer',
                border: selectedImage === index ? '2px solid #000' : 'none',
              }}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </Box>
      </Box>

      {/* Product Info */}
      <Box sx={{ px: 3, mt: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Nike Air Max 2024
        </Typography>
        <Typography variant="h6" color="primary" fontWeight={700} gutterBottom>
          $199.99
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label="Nuevo" color="error" size="small" />
          <Chip label="Envío gratis" color="success" size="small" />
        </Box>
        <Typography variant="body1" color="text.secondary" paragraph>
          El Nike Air Max 2024 combina la última tecnología de amortiguación con un diseño moderno y atrevido. Perfecto para corredores que buscan máximo confort y estilo.
        </Typography>
      </Box>

      {/* Size Selector */}
      <Box sx={{ px: 3, mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Selecciona tu talla
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <Chip
              key={size}
              label={size}
              onClick={() => setSelectedSize(size)}
              color={selectedSize === size ? 'primary' : 'default'}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Box>
      </Box>

      {/* Buy Button */}
      <Box sx={{ px: 3, mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<ShoppingBagIcon />}
          disabled={!selectedSize}
          sx={{ borderRadius: 3, fontWeight: 700, py: 1.5 }}
        >
          Agregar al carrito
        </Button>
      </Box>

      {/* Product Details Tabs */}
      <Box sx={{ px: 3, mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Detalles" />
          <Tab label="Especificaciones" />
          <Tab label="Reseñas" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <Typography variant="body1" color="text.secondary">
              • Amortiguación Air Max de última generación
              • Material transpirable y ligero
              • Diseño moderno y atrevido
              • Suela de goma duradera
              • Ideal para corredores de todos los niveles
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography variant="body1" color="text.secondary">
              • Peso: 280g
              • Material: Malla transpirable
              • Tecnología: Air Max
              • Tipo: Running
              • Cierre: Cordones
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography variant="body1" color="text.secondary">
              No hay reseñas aún. ¡Sé el primero en opinar!
            </Typography>
          )}
        </Box>
      </Box>

      {/* Related Products */}
      <Box sx={{ px: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Productos Relacionados
        </Typography>
        <Grid container spacing={2}>
          {relatedProducts.map((product) => (
            <Grid item xs={4} key={product.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                />
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={700}>
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

export default Products; 