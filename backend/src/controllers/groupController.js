const { body, validationResult } = require('express-validator');
const Group = require('../models/groupModel');
const TeamMember = require('../models/membeModel');

// Criação de grupo
async function createGroup(req, res) {
  await body('name').isLength({ min: 3 }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { name, members } = req.body;

  try {
    // Inclui automaticamente o usuário que criou o grupo como admin
    const allMembers = members?.map(m => ({ user: m, role: 'member' })) || [];
    allMembers.push({ user: req.userId, role: 'admin' });

    const newGroup = new Group({ name, members: allMembers });
    await newGroup.save();

    res.status(201).json({ success: true, message: 'Grupo criado com sucesso!', data: newGroup });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao criar grupo', error: err.message });
  }
}

// Listar grupos do usuário
async function getUserGroups(req, res) {
  try {
    const groups = await Group.find({ 'members.user': req.userId }).populate('members.user', 'username email');
    res.json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar grupos', error: err.message });
  }
}

module.exports = { createGroup, getUserGroups };
