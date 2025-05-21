import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Card } from '../index';

const OrderContainer = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
`;

const OrderHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const OrderStatus = styled(Typography)<{ status: string }>`
  color: ${props => {
    switch (props.status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Processing':
        return '#FFC107';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  }};
  font-weight: 600;
`;

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface OrderHistoryProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onViewOrder }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>
      {orders.map((order) => (
        <OrderContainer variant="outlined" animation="fade" key={order.id}>
          <OrderHeader>
            <Box>
              <Typography variant="subtitle1">
                Order #{order.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.date}
              </Typography>
            </Box>
            <OrderStatus status={order.status}>
              {order.status}
            </OrderStatus>
          </OrderHeader>
          <List>
            {order.items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="body2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h6">
              Total: ${order.total.toFixed(2)}
            </Typography>
            <IconButton onClick={() => onViewOrder(order.id)}>
              <Visibility />
            </IconButton>
          </Box>
        </OrderContainer>
      ))}
    </Box>
  );
};

export default OrderHistory; 