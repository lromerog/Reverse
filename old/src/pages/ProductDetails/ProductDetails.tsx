import React from 'react';
import { Box, Typography, Grid, Button, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../../components/Navigation/Navigation';
import ProductReviews from '../../components/ProductReviews/ProductReviews';
import { useAppContext } from '../../context/AppContext';

const ProductImage = styled(Box)`
  width: 100%;
  height: 500px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductInfo = styled(Box)`
  padding: 2rem;
`;

const AddToCartButton = styled(Button)`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background-color: ${props => props.theme.palette.secondary.main};
  color: white;
  
  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
  }
`;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addToCart } = useAppContext();
  
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <Box>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4">Product not found</Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductImage
              sx={{
                backgroundImage: `url(${product.image})`,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductInfo>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="secondary" gutterBottom>
                ${product.price}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <AddToCartButton 
                variant="contained"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </AddToCartButton>
            </ProductInfo>
          </Grid>
        </Grid>

        <ProductReviews productId={product.id} />
      </Container>
    </Box>
  );
};

export default ProductDetails; 