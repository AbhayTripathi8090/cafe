const express = require('express');
const { addWasteLog, getAllWasteLogs } = require('../controllers/wasteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST new log
router.post('/', protect, addWasteLog);

// GET all logs (admin view)
router.get('/', protect, getAllWasteLogs);

module.exports = router;
