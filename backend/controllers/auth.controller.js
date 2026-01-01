// backend/controllers/auth.controller.js

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../views/response.view');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists manually (Optional, but safe)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, "Email is already registered. Please login.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    successResponse(res, 'User registered successfully', user);
  } catch (err) {
    // --- FIX: Handle MongoDB Duplicate Key Error (E11000) ---
    if (err.code === 11000) {
      return errorResponse(res, 409, "Email is already registered. Please login.");
    }
    // Handle other errors gracefully
    errorResponse(res, 500, "Server error. Please try again later.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found. Please create an account.");
    }

    // 2. Check password
    if (!(await bcrypt.compare(password, user.password))) {
      return errorResponse(res, 401, "Invalid credentials. Please check your email or password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    successResponse(res, 'Login successful', { token, user: { id: user._id, username: user.username } });
  } catch (err) {
    errorResponse(res, 500, "Login failed. Please try again.");
  }
};  