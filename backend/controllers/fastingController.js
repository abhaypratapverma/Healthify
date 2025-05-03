import FastingRecord from '../models/FastingRecord.js';

export const logFasting = async (req, res) => {
  const { startTime, endTime, notes } = req.body;

  try {
    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // Duration in hours
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

    const savedRecord = await newFastingRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error logging fasting record' });
  }
};

export const getFastingHistory = async (req, res) => {
  try {
    const fastingHistory = await FastingRecord.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(fastingHistory);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching fasting history' });
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

    await fastingRecord.deleteOne();
    res.status(200).json({ message: 'Fasting record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting fasting record' });
  }
};
