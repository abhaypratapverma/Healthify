import FoodItem from '../models/FoodItem.js';

// Get all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Error fetching food items' });
  }
};

// Add a new food item
export const addFoodItem = async (req, res) => {
  const { name, image, category, type, calories, protein, carbs, fat, iron, calcium, vitaminB12 } = req.body;

  try {
    const newFoodItem = new FoodItem({
      name,
      image,
      category,
      type,
      calories,
      protein,
      carbs,
      fat,
      iron,
      calcium,
      vitaminB12,
    });

    await newFoodItem.save();
    res.status(201).json(newFoodItem);
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ message: 'Error adding food item' });
  }
};