import express from 'express';
import { logActivity, getActivityHistory } from '../controllers/activitiesController.js'; // Correct import
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, logActivity); // Log activity
router.get('/', protect, getActivityHistory); // Get activity history

export default router;