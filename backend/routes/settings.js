const express = require('express');
const Setting = require('../models/Setting');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/:group', async (req, res) => {
  try {
    const settings = await Setting.find({ group: req.params.group });
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Setting.find().sort({ group: 1 });
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:key', protect, adminOnly, async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value, group: req.body.group || 'general' },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
