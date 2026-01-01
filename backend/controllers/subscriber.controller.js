// backend/controllers/subscriber.controller.js
const Subscriber = require('../models/subscriber.model');
const { successResponse, errorResponse } = require('../views/response.view');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Simple validation
    if (!email || !email.includes('@')) {
      return errorResponse(res, 400, "Please enter a valid email address.");
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return errorResponse(res, 409, "You are already subscribed to our newsletter.");
    }

    await Subscriber.create({ email });
    successResponse(res, "Successfully subscribed to the newsletter!");
  } catch (err) {
    // Handle duplicate key error if race condition occurs
    if (err.code === 11000) {
      return errorResponse(res, 409, "You are already subscribed.");
    }
    errorResponse(res, 500, "Server error. Please try again later.");
  }
};