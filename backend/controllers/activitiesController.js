import Activity from '../models/activities.js';

export const logActivity = async (req, res) => {
  const { type, duration, intensity, calories, notes } = req.body;

  try {
    const newActivity = new Activity({
      user: req.user._id,
      type,
      duration,
      intensity,
      calories,
      notes,
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error logging activity' });
  }
};

export const getActivityHistory = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity history' });
  }
};