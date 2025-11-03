const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3 },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember', required: true },
      role: { type: String, enum: ['admin', 'member'], default: 'member' }
    }
  ],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
