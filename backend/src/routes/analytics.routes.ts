import { Router } from 'express';
import {
  getAnalytics,
  getDonationTrends,
  getUserTrends,
} from '../controllers/analytics.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router: Router = Router();

// All analytics routes require admin access
router.use(authenticate);
router.use(requireRole('ADMIN'));

// Analytics endpoints
router.get('/', getAnalytics);
router.get('/donations', getDonationTrends);
router.get('/users', getUserTrends);

export default router;
