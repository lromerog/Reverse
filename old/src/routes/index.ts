import { Router } from 'express';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import rewardRoutes from './rewardRoutes';
import { REVERSE_FEATURES } from '../config/integration';

const router = Router();

// API routes with feature flags
if (REVERSE_FEATURES.products) {
  router.use('/products', productRoutes);
}

if (REVERSE_FEATURES.orders) {
  router.use('/orders', orderRoutes);
}

if (REVERSE_FEATURES.rewards) {
  router.use('/rewards', rewardRoutes);
}

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', features: REVERSE_FEATURES });
});

export default router; 