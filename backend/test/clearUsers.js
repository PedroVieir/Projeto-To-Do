// backend/test/clearMembers.js
const mongoose = require('mongoose');
const path = require('path');

// 🔧 Força o carregamento do .env que está dentro de backend/
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const TeamMember = require('../src/models/memberModel');

async function clearMembers() {
  try {
    console.log('🧠 Conectando ao MongoDB...');
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const count = await TeamMember.countDocuments();
    if (count === 0) {
      console.log('⚠️ Nenhum membro encontrado.');
    } else {
      await TeamMember.deleteMany({});
      console.log(`✅ ${count} membros removidos com sucesso.`);
    }
  } catch (err) {
    console.error('❌ Erro ao limpar membros:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Conexão encerrada.');
  }
}

clearMembers();
