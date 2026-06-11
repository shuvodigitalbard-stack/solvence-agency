const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  service: { type: String, default: '' },
  budget: { type: String, default: '' },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
