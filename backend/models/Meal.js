const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  isHealthy: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
