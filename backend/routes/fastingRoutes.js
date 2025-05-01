import express from 'express';
import {
  logFasting,
  getFastingHistory,
  deleteFastingRecord,
} from '../controllers/fastingController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, logFasting); // Log a fasting record
router.get('/', protect, getFastingHistory); // Get fasting history
router.delete('/:id', protect, deleteFastingRecord); // Delete a fasting record

export default router;