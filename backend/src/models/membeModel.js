const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minlength: 3 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/.+@.+\..+/, 'Email inválido'],
  },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true,
});

const TeamMember = mongoose.model('TeamMember', memberSchema);
module.exports = TeamMember;
