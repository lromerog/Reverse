import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import BottomNav from '../../components/BottomNav/BottomNav';

// Simulación de productos en el carrito
const cartItems = [
  {
    id: '1',
    name: 'Camiseta justRecycle',
    price: 25,
    image: '/assets/images/products/tshirt1.png',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Camiseta Reverse',
    price: 30,
    image: '/assets/images/products/tshirt2.png',
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Box sx={{ background: '#232323', minHeight: '100vh', p: 4, pb: 10, color: 'white' }}>
      <Typography variant="h3" sx={{ mb: 4 }}>Carrito</Typography>
      {cartItems.length === 0 ? (
        <Typography>Tu carrito está vacío.</Typography>
      ) : (
        <>
          {cartItems.map(item => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={item.image} alt={item.name} style={{ width: 80, marginRight: 16, borderRadius: 8 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                <Typography variant="body2">${item.price} c/u</Typography>
              </Box>
              <Typography variant="h6">${item.price * item.quantity}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2, background: 'white' }} />
          <Typography variant="h5" sx={{ mb: 2 }}>Total: ${total}</Typography>
          <Button variant="contained" color="primary" fullWidth>Finalizar compra</Button>
        </>
      )}
      <BottomNav />
    </Box>
  );
};

export default Cart; 