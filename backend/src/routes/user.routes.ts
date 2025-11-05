import { Router } from 'express';
const router = Router();
router.get('/me', (req, res) => res.status(501).json({ message: 'Not implemented' }));
export default router;
