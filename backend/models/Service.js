const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  icon: { type: String, default: '🚀' },
  image: { type: String, default: '' },
  features: [{ type: String }],
  price: {
    type: { type: String, enum: ['fixed', 'hourly', 'custom'], default: 'custom' },
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' }
  },
  category: { type: String, enum: ['web', 'mobile', 'marketing', 'design', 'consulting', 'other'], default: 'other' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
