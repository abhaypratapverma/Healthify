// routes/bmiRoutes.js
import express from 'express';
import {calculateBMI} from '../controllers/bmiController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/calculate', protect, calculateBMI);  // POST route to calculate BMI

export default router;
