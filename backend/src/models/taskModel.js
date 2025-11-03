const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember', required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  title: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

taskSchema.index({ userId: 1, createdAt: -1 });
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
 