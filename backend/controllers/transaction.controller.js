// backend/controllers/transaction.controller.js

const Transaction = require('../models/transaction.model');
const { successResponse, errorResponse } = require('../views/response.view');

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;
    // Handle receipt if uploaded, else null
    const receipt = req.file ? req.file.path : null; 

    const transaction = await Transaction.create({
      userId: req.user.id,
      description,
      amount: Number(amount),
      type,
      category,
      date,
      receipt
    });
    successResponse(res, 'Transaction added', transaction);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Update Transaction (NEW FEATURE)
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // We do not update receipt here for simplicity, but you can add it
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true } // Return the updated doc
    );

    if (!updatedTransaction) return errorResponse(res, 404, "Transaction not found");
    successResponse(res, 'Transaction updated', updatedTransaction);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Get Transactions (With Filter Logic)
exports.getTransactions = async (req, res) => {
  try {
    const { category, days } = req.query;
    let query = { userId: req.user.id };

    // Filter by Category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by Date (Bonus Feature)
    if (days) {
      const dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - parseInt(days));
      query.date = { $gte: dateLimit };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    
    // Recalculate Totals based on filtered data (or fetch all for totals - simplified here)
    const allTransactions = await Transaction.find({ userId: req.user.id }); // Fetch all for accurate balance
    const totalIncome = allTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = allTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpense;

    successResponse(res, 'Data retrieved', { transactions, totalIncome, totalExpense, netIncome });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    successResponse(res, 'Transaction deleted');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};