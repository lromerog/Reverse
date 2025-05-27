import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import BottomNav from '../../components/BottomNav/BottomNav';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id || '');

  if (!product) return <Typography color="white">Producto no encontrado</Typography>;

  return (
    <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: 300, marginBottom: 24 }} />
        <Typography variant="h3">{product.name}</Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>{product.category}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>${product.price}</Typography>
        <Button variant="contained" color="primary">Comprar</Button>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default ProductDetail; 