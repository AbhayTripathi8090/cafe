const Meal = require('../models/Meal');

// @desc Get all meals
exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Add a new meal
exports.addMeal = async (req, res) => {
  const { name, calories, ingredients, isHealthy, imageUrl } = req.body;
  try {
    const meal = new Meal({ name, calories, ingredients, isHealthy, imageUrl });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete a meal
exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
