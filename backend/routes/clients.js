const express = require('express');
const Client = require('../models/Client');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find({ status: 'active' }).select('name logo company website').sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
