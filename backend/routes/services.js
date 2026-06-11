const express = require('express');
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    const services = await Service.find(filter).sort({ order: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
