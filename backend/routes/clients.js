const express = require('express');
const { getAll, getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, adminOnly, (req, res) => {
  try { res.json(getAll('SELECT * FROM clients ORDER BY created_at DESC')); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const r = run('INSERT INTO clients (name, email, phone, company, status, notes) VALUES (?,?,?,?,?,?)', [name, email||'', phone||'', company||'', status||'active', notes||'']);
    res.status(201).json(getOne('SELECT * FROM clients WHERE id = ?', [r.lastInsertRowid]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    run('UPDATE clients SET name=?, email=?, phone=?, company=?, status=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', [name, email, phone, company, status, notes, req.params.id]);
    res.json(getOne('SELECT * FROM clients WHERE id = ?', [req.params.id]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, (req, res) => {
  try { run('DELETE FROM clients WHERE id = ?', [req.params.id]); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
