import { Router } from 'express';
import {
  submitContactForm,
  getAllInquiries,
  updateInquiryStatus,
} from '../controllers/contact.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router: Router = Router();

// Public routes
router.post('/', submitContactForm);

// Admin routes
router.get('/inquiries', authenticate, requireRole('ADMIN'), getAllInquiries);
router.patch('/inquiries/:id', authenticate, requireRole('ADMIN'), updateInquiryStatus);

export default router;
