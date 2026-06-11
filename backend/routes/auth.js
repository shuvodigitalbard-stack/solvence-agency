const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'solvence_secret_key_2026';

function generateToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
}

router.post('/register', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/me', protect, async (req, res) => { res.json(req.user); });

router.put('/me', protect, async (req, res) => {
  try {
    req.user.name = req.body.name || req.user.name;
    req.user.email = req.body.email || req.user.email;
    const updated = await req.user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
