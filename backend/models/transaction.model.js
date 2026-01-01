// backend/models/transaction.model.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true }, // [cite: 12]
  type: { type: String, enum: ['income', 'expense'], required: true }, // [cite: 11]
  category: { type: String, required: true }, // [cite: 16]
  date: { type: Date, required: true }, // [cite: 12]
  receipt: { type: String }, // File path for multer upload
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);