const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String, default: '' },
  website: { type: String, default: '' },
  logo: { type: String, default: '' },
  serviceType: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive', 'prospect', 'completed'], default: 'active' },
  notes: { type: String, default: '' },
  projectValue: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
