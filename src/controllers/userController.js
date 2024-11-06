const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Register User
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists.");

    const user = await User.create({ name, email, password });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.send({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Get paginated users
exports.getPaginatedUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const perPage = parseInt(req.query.perPage) || 10; // Results per page, default is 10
  console.log(page);
  try {
    // Count total items
    const totalItems = await User.count();

    // Fetch paginated data
    const users = await User.find({
      offset: (page - 1) * perPage, // Skip items for previous pages
      limit: perPage,               // Limit results per page
    });

    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      data: users,
      currentPage: page,
      perPage,
      totalItems,
      totalPages,
    });
  } catch (error) {
    console.error('Error occurred while fetching paginated users:', error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send("User not found");
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
