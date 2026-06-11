const express = require('express');
const TeamMember = require('../models/TeamMember');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json(members);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json(member);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
