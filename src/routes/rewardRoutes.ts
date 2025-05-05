import { Router } from 'express';
import { RewardController } from '../controllers/RewardController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All reward routes require authentication
router.use(authMiddleware);

// User routes
router.get('/my-rewards', RewardController.getUserRewards);
router.post('/', RewardController.create);

// Admin routes (you might want to add admin middleware here)
router.put('/:id/status', RewardController.updateStatus);
router.get('/stats', RewardController.getStats);

export default router; 