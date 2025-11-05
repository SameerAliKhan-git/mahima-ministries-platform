import { Router } from 'express';
import {
  submitPartnershipApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
} from '../controllers/partnership.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router: Router = Router();

// Public routes
router.post('/apply', submitPartnershipApplication);

// Admin routes
router.get('/applications', authenticate, requireRole('ADMIN'), getAllApplications);
router.get('/applications/:id', authenticate, requireRole('ADMIN'), getApplicationById);
router.patch('/applications/:id', authenticate, requireRole('ADMIN'), updateApplicationStatus);

export default router;
