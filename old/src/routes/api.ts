import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { ProductController } from '../controllers/ProductController';
import { OrderController } from '../controllers/OrderController';
import { RewardController } from '../controllers/RewardController';

const router = Router();

// Rutas de autenticación
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/profile', authMiddleware, AuthController.getProfile);
router.put('/auth/profile', authMiddleware, AuthController.updateProfile);
router.put('/auth/password', authMiddleware, AuthController.changePassword);

// Rutas de productos
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.get('/products/category/:category', ProductController.getByCategory);
router.get('/products/search/:query', ProductController.search);
router.post('/products', authMiddleware, adminMiddleware, ProductController.create);
router.put('/products/:id', authMiddleware, adminMiddleware, ProductController.update);
router.delete('/products/:id', authMiddleware, adminMiddleware, ProductController.delete);

// Rutas de pedidos
router.get('/orders', authMiddleware, OrderController.getUserOrders);
// router.get('/orders/:id', authMiddleware, OrderController.getOrderById);
router.post('/orders', authMiddleware, OrderController.create);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, OrderController.updateStatus);
router.get('/orders/stats', authMiddleware, adminMiddleware, OrderController.getStats);

// Rutas de recompensas
// router.get('/rewards', authMiddleware, RewardController.getAvailableRewards);
// router.get('/rewards/redeemed', authMiddleware, RewardController.getRedeemedRewards);
// router.post('/rewards/:id/redeem', authMiddleware, RewardController.redeem);
// router.post('/rewards', authMiddleware, adminMiddleware, RewardController.create);
// router.put('/rewards/:id', authMiddleware, adminMiddleware, RewardController.update);
// router.delete('/rewards/:id', authMiddleware, adminMiddleware, RewardController.delete);

export default router; 