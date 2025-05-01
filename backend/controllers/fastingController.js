import FastingRecord from '../models/FastingRecord.js';

export const logFasting = async (req, res) => {
  const { startTime, endTime, notes } = req.body;

  try {
    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // Calculate duration in hours
    if (duration <= 0) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const newFastingRecord = new FastingRecord({
      user: req.user._id,
      startTime,
      endTime,
      duration,
      notes,
    });

    await newFastingRecord.save();
    res.status(201).json(newFastingRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error logging fasting record' });
  }
};

export const getFastingHistory = async (req, res) => {
  try {
    const fastingHistory = await FastingRecord.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(fastingHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fasting history' });
  }
};

export const deleteFastingRecord = async (req, res) => {
  try {
    const fastingRecord = await FastingRecord.findById(req.params.id);
    if (!fastingRecord) {
      return res.status(404).json({ message: 'Fasting record not found' });
    }

    if (fastingRecord.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this record' });
    }

    await fastingRecord.remove();
    res.status(200).json({ message: 'Fasting record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fasting record' });
  }
};