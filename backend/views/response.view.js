// backend/views/response.view.js

const successResponse = (res, message, data = null) => {
  res.status(200).json({ success: true, message, data });
};

const errorResponse = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

module.exports = { successResponse, errorResponse };