const WasteLog = require('../models/WasteLog');

// @desc Add waste log
exports.addWasteLog = async (req, res) => {
  const { item, quantity, reason } = req.body;
  try {
    const log = new WasteLog({
      item,
      quantity,
      reason,
      recordedBy: req.user._id,
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all waste logs (admin)
exports.getAllWasteLogs = async (req, res) => {
  try {
    const logs = await WasteLog.find().populate('recordedBy', 'name email');
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
