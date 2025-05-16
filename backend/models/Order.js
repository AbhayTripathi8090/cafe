const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal',
      required: true,
    }
  ],
  scheduledTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ready', 'picked up'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
