const express = require('express');
const { getAll, getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  try { res.json(getAll('SELECT * FROM messages ORDER BY created_at DESC')); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, message required' });
    const r = run('INSERT INTO messages (name, email, subject, message) VALUES (?,?,?,?)', [name, email, subject||'', message]);
    res.status(201).json(getOne('SELECT * FROM messages WHERE id = ?', [r.lastInsertRowid]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/status', protect, adminOnly, (req, res) => {
  try {
    const { status } = req.body;
    run('UPDATE messages SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json(getOne('SELECT * FROM messages WHERE id = ?', [req.params.id]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, (req, res) => {
  try { run('DELETE FROM messages WHERE id = ?', [req.params.id]); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
