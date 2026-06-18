const express = require('express');
const { getAll, getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM services WHERE is_active = 1';
    const params = [];
    if (category) { sql += ' AND category = ?'; params.push(category); }
    sql += ' ORDER BY sort_order ASC';
    const services = getAll(sql, params);
    services.forEach(s => { try { s.features = JSON.parse(s.features); } catch(e) { s.features = []; } });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/slug/:slug', (req, res) => {
  try {
    const service = getOne('SELECT * FROM services WHERE slug = ? AND is_active = 1', [req.params.slug]);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    try { service.features = JSON.parse(service.features); } catch(e) { service.features = []; }
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/all', protect, adminOnly, (req, res) => {
  try {
    const services = getAll('SELECT * FROM services ORDER BY sort_order ASC');
    services.forEach(s => { try { s.features = JSON.parse(s.features); } catch(e) { s.features = []; } });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, (req, res) => {
  try {
    const { title, slug, short_description, full_description, icon, image, features, price_type, price_amount, price_currency, category, sort_order } = req.body;
    const r = run('INSERT INTO services (title, slug, short_description, full_description, icon, image, features, price_type, price_amount, price_currency, category, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [title, slug, short_description, full_description || '', icon || '🚀', image || '', JSON.stringify(features || []), price_type || 'custom', price_amount || 0, price_currency || 'USD', category || 'other', sort_order || 0]);
    const service = getOne('SELECT * FROM services WHERE id = ?', [r.lastInsertRowid]);
    res.status(201).json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, (req, res) => {
  try {
    const existing = getOne('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Service not found' });
    const { title, slug, short_description, full_description, icon, image, features, price_type, price_amount, price_currency, category, sort_order, is_active } = req.body;
    run('UPDATE services SET title=?, slug=?, short_description=?, full_description=?, icon=?, image=?, features=?, price_type=?, price_amount=?, price_currency=?, category=?, sort_order=?, is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [title || existing.title, slug || existing.slug, short_description || existing.short_description, full_description ?? existing.full_description, icon || existing.icon, image || existing.image, features ? JSON.stringify(features) : existing.features, price_type || existing.price_type, price_amount ?? existing.price_amount, price_currency || existing.price_currency, category || existing.category, sort_order ?? existing.sort_order, is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active, req.params.id]);
    const service = getOne('SELECT * FROM services WHERE id = ?', [req.params.id]);
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, (req, res) => {
  try {
    run('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
