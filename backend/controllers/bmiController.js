import BmiRecord from '../models/BmiRecord.js';

export const calculateBMI = async (req, res) => {
  const { weight, height } = req.body;
  const userId = req.user._id; // Retrieve the user ID from the request object

  if (!weight || !height) {
    return res.status(400).json({ message: 'Weight and height are required' });
  }

  try {
    // BMI Calculation Formula: BMI = weight / (height * height)
    const bmi = weight / (height * height);

    // Create a new BMI record and associate it with the user
    const newBmiRecord = new BmiRecord({
      user: userId, // Pass the user ID
      bmi: bmi,
      weight: weight,
      height: height,
    });

    await newBmiRecord.save(); // Save the record in the database

    res.status(200).json({ bmi, message: 'BMI successfully calculated' });
  } catch (error) {
    console.error('BMI Calculation Error:', error);
    res.status(500).json({ message: 'Error calculating BMI' });
  }
};
