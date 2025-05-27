export const REVERSE_API_URL = process.env.REACT_APP_REVERSE_API_URL || 'http://localhost:3001/api';

export const REVERSE_ROUTES = {
  products: '/products',
  orders: '/orders',
  rewards: '/rewards'
};

export const REVERSE_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const getAuthHeaders = (token: string) => ({
  ...REVERSE_HEADERS,
  'Authorization': `Bearer ${token}`
});

export const REVERSE_FEATURES = {
  products: true,
  orders: true,
  rewards: true
};

export const REVERSE_PERMISSIONS = {
  viewProducts: true,
  createOrder: true,
  viewOrders: true,
  viewRewards: true,
  redeemRewards: true
}; 