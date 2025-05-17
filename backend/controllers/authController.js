const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password, isAdmin = false } = req.body;  // Accept isAdmin
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isAdmin });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },  // Include isAdmin in token
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },  // Include isAdmin in token
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

