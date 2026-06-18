const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAll, getOne, run } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });
  next();
};

const pubFields = `id AS _id, id, title, slug, short_description AS shortDescription, full_description AS fullDescription, icon, image, features, price_type AS priceType, price_amount AS priceAmount, price_currency AS priceCurrency, category, is_active AS isActive, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt`;

router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let sql = `SELECT ${pubFields} FROM services WHERE is_active = 1`;
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
    const service = getOne(`SELECT ${pubFields} FROM services WHERE slug = ? AND is_active = 1`, [req.params.slug]);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    try { service.features = JSON.parse(service.features); } catch(e) { service.features = []; }
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/all', protect, adminOnly, (req, res) => {
  try {
    const services = getAll(`SELECT ${pubFields} FROM services ORDER BY sort_order ASC`);
    services.forEach(s => { try { s.features = JSON.parse(s.features); } catch(e) { s.features = []; } });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, [
  body('title').trim().isLength({ min: 2 }).withMessage('Title required'),
  body('slug').trim().isLength({ min: 2 }).withMessage('Slug required'),
  body('shortDescription').trim().isLength({ min: 10 }).withMessage('Short description required'),
  handleValidation
], (req, res) => {
  try {
    const { title, slug, shortDescription, fullDescription, icon, image, features, priceType, priceAmount, priceCurrency, category, sortOrder } = req.body;
    const r = run('INSERT INTO services (title, slug, short_description, full_description, icon, image, features, price_type, price_amount, price_currency, category, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [title, slug, shortDescription, fullDescription || '', icon || '🚀', image || '', JSON.stringify(features || []), priceType || 'custom', priceAmount || 0, priceCurrency || 'USD', category || 'other', sortOrder || 0]);
    const service = getOne(`SELECT ${pubFields} FROM services WHERE id = ?`, [r.lastInsertRowid]);
    res.status(201).json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, (req, res) => {
  try {
    const existing = getOne('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Service not found' });
    const { title, slug, shortDescription, fullDescription, icon, image, features, priceType, priceAmount, priceCurrency, category, sortOrder, isActive } = req.body;
    run('UPDATE services SET title=?, slug=?, short_description=?, full_description=?, icon=?, image=?, features=?, price_type=?, price_amount=?, price_currency=?, category=?, sort_order=?, is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [title || existing.title, slug || existing.slug, shortDescription ?? existing.short_description, fullDescription ?? existing.full_description, icon || existing.icon, image || existing.image, features ? JSON.stringify(features) : existing.features, priceType || existing.price_type, priceAmount ?? existing.price_amount, priceCurrency || existing.price_currency, category || existing.category, sortOrder ?? existing.sort_order, isActive !== undefined ? (isActive ? 1 : 0) : existing.is_active, req.params.id]);
    const service = getOne(`SELECT ${pubFields} FROM services WHERE id = ?`, [req.params.id]);
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
