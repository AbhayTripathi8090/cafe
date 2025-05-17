const express = require('express')
const router = express.Router();
const { protect ,adminProtect} = require('../middleware/authMiddleware')
const User = require('../models/User');
const Meal = require('../models/Meal');
const Order = require('../models/Order');

// Get all users
router.get('/users', protect, adminProtect, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});


// Get all orders with user + meal populated
router.get('/orders', protect, adminProtect, async (req, res) => {
  const orders = await Order.find().populate('user').populate('meal');
  res.json(orders);
});

// Delete a user
router.delete('/users/:id', protect, adminProtect, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Promote/demote user
router.put('/users/:id/role', protect, adminProtect, async (req, res) => {
  const { isAdmin } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { isAdmin }, { new: true });
  res.json(user);
});

module.exports = router;
