import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', ProductController.getAll);
router.get('/search/:query', ProductController.search);
router.get('/category/:category', ProductController.getByCategory);
router.get('/:id', ProductController.getById);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router; 