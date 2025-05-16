const express = require('express');
const { getMeals, addMeal, deleteMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: Get all meals
router.get('/', getMeals);

// Private: Add and delete meals (protected)
router.post('/', protect, addMeal);
router.delete('/:id', protect, deleteMeal);

module.exports = router;
