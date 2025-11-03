const mongoose = require('mongoose');

async function connectToDatabase() {
  const uri = process.env.DATABASE_URI;

  if (!uri) {
    console.error('❌ DATABASE_URI não definida no .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 segundos
    });

    console.log('📦 Banco de dados conectado com sucesso');

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Banco de dados desconectado');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Erro na conexão com o banco:', err);
    });
  } catch (err) {
    console.error('❌ Falha ao conectar no banco de dados:', err);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
