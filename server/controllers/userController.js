import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get user data
// @route   GET /api/users/
// @access  Private
export const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// @desc    Store recent searched cities
// @route   POST /api/users/store-recent-search
// @access  Private
export const storeRecentSearchedCities = asyncHandler(async (req, res) => {
  const { city } = req.body;

  if (!city) {
    res.status(400);
    throw new Error("City is required");
  }

  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.recentSearchedCities.includes(city)) {
    user.recentSearchedCities.push(city);
    await user.save();
  }

  res.status(200).json(user.recentSearchedCities);
});
 