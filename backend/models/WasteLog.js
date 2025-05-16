const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number, // in grams or units
    required: true,
  },
  reason: {
    type: String,
    enum: ['overproduction', 'spoilage', 'returned', 'leftover'],
    required: true,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('WasteLog', wasteLogSchema);
