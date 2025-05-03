import express from 'express';
import { getAllFoodItems, addFoodItem } from '../controllers/foodController.js';

const router = express.Router();

// Route to get all food items
router.get('/', getAllFoodItems);

// Route to add a new food item
router.post('/', addFoodItem);

export default router;