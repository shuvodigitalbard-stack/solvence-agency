const jwt = require('jsonwebtoken');
const { getOne } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'solvence_secret_key_2026';

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Not authorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = getOne('SELECT id, name, email, role, avatar, is_active FROM users WHERE id = ?', [decoded.id]);
    if (!user || !user.is_active) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
