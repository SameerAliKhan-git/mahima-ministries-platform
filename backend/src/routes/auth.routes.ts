import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getCurrentUser);

// TODO: Implement these routes
router.post('/forgot-password', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/reset-password', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/verify-email', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
