import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Grains & Flours", "Vegetables"
  type: { type: String, enum: ['veg', 'nonveg'], required: true }, // "veg" or "nonveg"
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  iron: { type: Number, required: true },
  calcium: { type: Number, required: true },
  vitaminB12: { type: Number, required: true },
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;