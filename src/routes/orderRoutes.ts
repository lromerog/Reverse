import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

// User routes
router.get('/my-orders', OrderController.getUserOrders);
router.post('/', OrderController.create);

// Admin routes (you might want to add admin middleware here)
router.put('/:id/status', OrderController.updateStatus);
router.get('/stats', OrderController.getStats);

export default router; 