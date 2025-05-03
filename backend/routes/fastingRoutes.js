import express from 'express';
import {
  logFasting,
  getFastingHistory,
  deleteFastingRecord,
} from '../controllers/fastingController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, logFasting);
router.get('/', protect, getFastingHistory);
router.delete('/:id', protect, deleteFastingRecord);

export default router;
