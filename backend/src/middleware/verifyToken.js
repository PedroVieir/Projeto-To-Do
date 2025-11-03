const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET não definida no .env');
  process.exit(1);
}

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (err) {
    console.error('❌ Token inválido:', err.message);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
