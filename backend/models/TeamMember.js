const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, default: '' },
  photo: { type: String, default: '' },
  email: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  skills: [{ type: String }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
