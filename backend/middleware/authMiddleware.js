const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token not valid' });
  }
};

const adminProtect = (req,res,next) =>{
  if(!req.user?.isAdmin){
    return res.status(403).json({message:'Access denied:Admin only'});
  }
  next();
}

module.exports = { protect ,adminProtect};
