const express = require('express');
const { getMeals, addMeal, deleteMeal } = require('../controllers/mealController');
const { protect,adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: Get all meals
router.get('/', getMeals);

// Private: Add and delete meals (protected)
router.post('/', protect, adminProtect,addMeal);
router.delete('/:id', protect,adminProtect, deleteMeal);

module.exports = router;
