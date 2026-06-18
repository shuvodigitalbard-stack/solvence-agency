const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'solvence_secret_key_2026';

function generateToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
}

router.post('/register', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = getOne('SELECT id FROM users WHERE email = ?', [email]);
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const hp = await bcrypt.hash(password, 12);
    const r = run('INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)', [name, email, hp, role || 'staff']);
    const user = getOne('SELECT id, name, email, role FROM users WHERE id = ?', [r.lastInsertRowid]);
    res.status(201).json({ ...user, token: generateToken(user.id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = getOne('SELECT * FROM users WHERE email = ? AND is_active = 1', [email]);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user.id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/me', protect, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
});

router.put('/me', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    run('UPDATE users SET name=?, email=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', [name || req.user.name, email || req.user.email, req.user.id]);
    const updated = getOne('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/users', protect, adminOnly, (req, res) => {
  try {
    const { getAll } = require('../config/db');
    const users = getAll('SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
