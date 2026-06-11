const express = require('express');
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message: 'Message sent successfully!', _id: message._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const messages = await Message.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/stats/count', protect, adminOnly, async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const newCount = await Message.countDocuments({ status: 'new' });
    const replied = await Message.countDocuments({ status: 'replied' });
    res.json({ total, new: newCount, replied });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
