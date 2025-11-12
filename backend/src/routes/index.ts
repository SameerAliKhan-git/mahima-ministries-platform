import { Router } from 'express';
import authRoutes from './auth.routes';
import donationRoutes from './donation.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import contactRoutes from './contact.routes';
import partnershipRoutes from './partnership.routes';
import paytmRoutes from './paytm.routes';
import analyticsRoutes from './analytics.routes';
import reportRoutes from './report.routes';

const router = Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/donations', donationRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes);
router.use('/partnerships', partnershipRoutes);
router.use('/paytm', paytmRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/', reportRoutes);

// CSRF token endpoint
router.get('/csrf-token', (req, res) => {
  res.json({
    success: true,
    csrfToken: 'token-placeholder', // Will be implemented with csurf
  });
});

export default router;
