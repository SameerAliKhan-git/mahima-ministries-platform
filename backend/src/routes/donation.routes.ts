import { Router } from 'express';
import {
  createDonation,
  getMyDonations,
  getAllDonations,
  getDonationById,
  handleStripeWebhook,
  cancelRecurringDonation,
} from '../controllers/donation.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/webhook', handleStripeWebhook);

// Protected routes
router.post('/', authenticate, createDonation);
router.get('/my-donations', authenticate, getMyDonations);
router.get('/:id', authenticate, getDonationById);
router.delete('/:id/recurring', authenticate, cancelRecurringDonation);

// Admin routes
router.get('/', authenticate, requireRole('ADMIN'), getAllDonations);

export default router;
