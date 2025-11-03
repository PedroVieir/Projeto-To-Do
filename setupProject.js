// moveEnv.js
const fs = require('fs');
const path = require('path');

// Caminhos
const currentPath = path.join(__dirname, '.env');         // .env na raiz do projeto
const targetPath = path.join(__dirname, 'backend', '.env'); // destino dentro de backend/

// Verifica se o .env existe na raiz
if (!fs.existsSync(currentPath)) {
    console.error('❌ .env não encontrado na raiz do projeto.');
    process.exit(1);
}

// Verifica se já existe .env no destino
if (fs.existsSync(targetPath)) {
    console.log('⚠️ .env já existe em backend/, será substituído.');
    fs.unlinkSync(targetPath); // remove o antigo
}

// Move o arquivo
fs.renameSync(currentPath, targetPath);
console.log('✅ .env movido para backend/ com sucesso!');
