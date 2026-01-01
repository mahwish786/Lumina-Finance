// backend/routes/api.routes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { addTransaction, getTransactions, deleteTransaction, updateTransaction } = require('../controllers/transaction.controller');
const { subscribe } = require('../controllers/subscriber.controller');
const { verifyToken, upload } = require('./middleware');

router.post('/auth/register', register);
router.post('/auth/login', login);

// Transaction Routes
router.post('/transactions', verifyToken, upload.single('receipt'), addTransaction);
router.get('/transactions', verifyToken, getTransactions);
router.delete('/transactions/:id', verifyToken, deleteTransaction);
router.put('/transactions/:id', verifyToken, updateTransaction); // New Route
router.post('/subscribe', subscribe);

module.exports = router;