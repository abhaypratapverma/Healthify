import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; // ✅ correct route file
import userRoutes from './routes/userRoutes.js'; // ✅ correct route file
import bmiRoutes from './routes/bmiRoutes.js'; // ✅ correct route file
import activityRoutes from './routes/activitiesRoutes.js'; // ✅ correct route file
import fastingRoutes from './routes/fastingRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/fasting', fastingRoutes);
app.use('/api/food', foodRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Healthify Backend!');
});

export default app;
