
const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  reason: {
    type: String
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('WasteLog', wasteLogSchema);
