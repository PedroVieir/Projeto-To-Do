// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDatabase = require('./config/dbConnection');

dotenv.config();

const app = express();

// ✅ Middlewares essenciais
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Conexão com o MongoDB (com confirmação de inicialização)
connectToDatabase()
  .then(() => console.log('📦 Banco de dados conectado com sucesso'))
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco:', err.message);
    process.exit(1); // encerra se o banco falhar
  });

// ✅ Importação das rotas
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const taskRoutes = require('./routes/taskRoutes');

// ✅ Rota base
app.get('/', (req, res) => res.send('🚀 ToDo+ backend is running!'));

// ✅ Registro das rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/grupos', groupRoutes);
app.use('/api/tarefas', taskRoutes);

// ✅ Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro interno:', err.stack);
  res.status(500).json({ success: false, error: 'Erro interno no servidor' });
});

// ✅ Inicialização do servidor
const PORT = process.env.API_PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Servidor disponível em http://localhost:${PORT}`);
});
