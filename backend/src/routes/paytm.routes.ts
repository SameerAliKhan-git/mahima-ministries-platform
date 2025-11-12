import express from 'express';
import {
  initiatePayment,
  handleCallback,
  checkPaymentStatus,
  getAllDonations
} from '../controllers/paytm.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/initiate', initiatePayment); // Can be used by guests or logged-in users
router.post('/callback', handleCallback); // Paytm callback handler
router.get('/status', checkPaymentStatus); // Check payment status

// Admin routes
router.get(
  '/donations',
  authenticate,
  requireRole(['ADMIN']),
  getAllDonations
);

export default router;
