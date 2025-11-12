import express from 'express';
import {
  uploadReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByType,
  getReportStats,
} from '../controllers/report.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { uploadPDF } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/reports', getAllReports);
router.get('/reports/by-type', getReportsByType);
router.get('/reports/:id', getReportById);

// Admin routes
router.post('/reports', authenticate, requireRole('ADMIN'), uploadPDF.single('file'), uploadReport);
router.put('/reports/:id', authenticate, requireRole('ADMIN'), updateReport);
router.delete('/reports/:id', authenticate, requireRole('ADMIN'), deleteReport);
router.get('/reports-stats', authenticate, requireRole('ADMIN'), getReportStats);

export default router;
