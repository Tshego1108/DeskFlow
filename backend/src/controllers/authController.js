const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Registration endpoint removed - system uses seeded users only.

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).json({message: 'Invalid credentials'});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({message: 'Invalid credentials'});
    const token = generateToken(user);
    // Keep legacy `user` object for frontend compatibility, and also include top-level fields.
    res.status(200).json({
      token,
      user: {id: user._id, name: user.name, email: user.email, role: user.role},
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) { next(err); }
};

