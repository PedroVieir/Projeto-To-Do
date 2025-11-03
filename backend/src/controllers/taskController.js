const { body, validationResult } = require('express-validator');
const Task = require('../models/taskModel');
const Group = require('../models/groupModel');

// Criação de tarefa (individual ou de grupo)
async function createTask(req, res) {
  await body('title').isLength({ min: 1 }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { title, groupId } = req.body;
  try {
    if (groupId) {
      // Checa se o usuário pertence ao grupo
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ success: false, message: 'Grupo não encontrado' });

      const member = group.members.find(m => m.user.toString() === req.userId);
      if (!member) return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    const task = await Task.create({ title, userId: req.userId, groupId: groupId || null });
    res.status(201).json({ success: true, message: 'Tarefa criada com sucesso!', data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao criar tarefa', error: err.message });
  }
}

// Listar tarefas do usuário
async function listTasks(req, res) {
  try {
    const tasks = await Task.find({ $or: [{ userId: req.userId }, { groupId: { $in: await Group.find({ 'members.user': req.userId }).distinct('_id') } }] }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar tarefas', error: err.message });
  }
}

// Alternar status da tarefa
async function toggleComplete(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });

    // Verifica se o usuário tem acesso à tarefa
    if (task.userId.toString() !== req.userId && task.groupId) {
      const group = await Group.findById(task.groupId);
      const member = group.members.find(m => m.user.toString() === req.userId);
      if (!member) return res.status(403).json({ success: false, message: 'Acesso negado' });
    } else if (!task.groupId && task.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    task.completed = !task.completed;
    await task.save();
    res.json({ success: true, message: 'Tarefa atualizada', data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar tarefa', error: err.message });
  }
}

// Deletar tarefa
async function deleteTask(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });

    // Verifica permissão
    if (task.userId.toString() !== req.userId && task.groupId) {
      const group = await Group.findById(task.groupId);
      const member = group.members.find(m => m.user.toString() === req.userId);
      if (!member) return res.status(403).json({ success: false, message: 'Acesso negado' });
    } else if (!task.groupId && task.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    await task.deleteOne();
    res.json({ success: true, message: 'Tarefa deletada', data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao deletar tarefa', error: err.message });
  }
}

module.exports = { createTask, listTasks, toggleComplete, deleteTask };
