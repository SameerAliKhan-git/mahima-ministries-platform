import { Router } from 'express';
import authRoutes from './auth.routes';
import donationRoutes from './donation.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import contactRoutes from './contact.routes';
import partnershipRoutes from './partnership.routes';

const router = Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/donations', donationRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes);
router.use('/partnerships', partnershipRoutes);

// CSRF token endpoint
router.get('/csrf-token', (req, res) => {
  res.json({
    success: true,
    csrfToken: 'token-placeholder', // Will be implemented with csurf
  });
});

export default router;
