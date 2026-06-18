const express = require('express');
const { getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const settings = {};
    const rows = require('../config/db').getAll('SELECT key, value FROM settings');
    rows.forEach(r => settings[r.key] = r.value);
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/', protect, adminOnly, (req, res) => {
  try {
    Object.entries(req.body).forEach(([key, value]) => {
      run('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [key, value]);
    });
    res.json({ message: 'Settings updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
