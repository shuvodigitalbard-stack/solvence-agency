const express = require('express');
const { getAll, getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  try { res.json(getAll('SELECT * FROM team WHERE is_active = 1 ORDER BY sort_order ASC')); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, (req, res) => {
  try {
    const { name, role, bio, avatar, sort_order } = req.body;
    const r = run('INSERT INTO team (name, role, bio, avatar, sort_order) VALUES (?,?,?,?,?)', [name, role, bio||'', avatar||'', sort_order||0]);
    res.status(201).json(getOne('SELECT * FROM team WHERE id = ?', [r.lastInsertRowid]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, (req, res) => {
  try {
    const { name, role, bio, avatar, sort_order, is_active } = req.body;
    run('UPDATE team SET name=?, role=?, bio=?, avatar=?, sort_order=?, is_active=? WHERE id=?', [name, role, bio, avatar, sort_order, is_active!==undefined?(is_active?1:0):1, req.params.id]);
    res.json(getOne('SELECT * FROM team WHERE id = ?', [req.params.id]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, (req, res) => {
  try { run('DELETE FROM team WHERE id = ?', [req.params.id]); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
