 const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   GET /api/users
// @desc    Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   GET /api/users/latest
// @desc    Get latest 10 users
router.get("/latest", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   GET /api/users/search?name=someName
// @desc    Search users by name
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
