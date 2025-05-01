// controllers/userController.js
import User from "../models/User.js"; // Ensure the correct model is imported

// Get user profile - protected route
export const getUserProfile = async (req, res) => {
  try {
    // Extract user ID from the request object
    const userId = req.user; // The user ID is added by the authMiddleware

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
