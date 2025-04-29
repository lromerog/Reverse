import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Stack,
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import Checkout from '../Checkout/Checkout';
import { Product } from '../../context/ProductContext';

const CartDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
    padding: 2rem;
  }
`;

const CartItem = styled(Box)`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
`;

const ProductImage = styled(Box)`
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const QuantityControl = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background-color: ${props => props.theme.palette.secondary.main};
  color: white;
  
  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
  }
`;

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
    onClose();
  };

  if (showCheckout) {
    return <Checkout onClose={handleCheckoutClose} />;
  }

  return (
    <CartDrawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Shopping Cart</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      
      <Stack spacing={2}>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <CartItem>
              <ProductImage
                sx={{
                  backgroundImage: `url(${item.image})`
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">
                  ${item.price}
                </Typography>
                <QuantityControl>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Add />
                  </IconButton>
                </QuantityControl>
              </Box>
              <IconButton
                color="error"
                onClick={() => removeFromCart(item.id)}
              >
                <Delete />
              </IconButton>
            </CartItem>
            <Divider />
          </React.Fragment>
        ))}
      </Stack>

      {cart.length > 0 ? (
        <>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
          <CheckoutButton variant="contained" onClick={handleCheckout}>
            Checkout
          </CheckoutButton>
        </>
      ) : (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Your cart is empty
        </Typography>
      )}
    </CartDrawer>
  );
};

export default Cart; 