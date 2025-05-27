import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import styled from 'styled-components';
import { Product } from '../../context/ProductContext';

const StyledCard = styled(Card)`
  position: relative;
  transition: transform 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
`;

const FavoriteButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface ProductCardProps {
  product: Product;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteClick, isFavorite = false }) => {
  return (
    <StyledCard>
      <FavoriteButton onClick={onFavoriteClick}>
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </FavoriteButton>
      <StyledCardMedia
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard; 