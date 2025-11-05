const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/membeModel');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

async function registerMember(req, res) {
  await body('username').isLength({ min: 3 }).run(req);
  await body('email').isEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { username, email, password } = req.body;
  try {
    const existing = await TeamMember.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email já registrado' });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new TeamMember({ username, email, passwordHash });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso!',
      data: { id: newUser._id, username, email }
    });
  } catch (err) {
    console.error('❌ ERRO REGISTER:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}

async function loginMember(req, res) {
  await body('email').isEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await TeamMember.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Credenciais inválidas!' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Credenciais inválidas!' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      token,
      data: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('❌ ERRO LOGIN:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}


module.exports = { registerMember, loginMember };
