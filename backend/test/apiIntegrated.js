const axios = require('axios');
const API_URL = 'http://localhost:5050/api';

let tokenPedro = null;
let tokenAlice = null;
let groupId = null;
let taskPedroId = null;
let taskGroupId = null;

const users = {
  Pedro: { username: 'PedroTest', email: 'pedrotest@example.com', password: '12345678' },
  Alice: { username: 'AliceTest', email: 'alicetest@example.com', password: '87654321' }
};

// Função para registrar usuário
async function registerUser(user) {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, user);
    console.log('✅ Registro:', res.data.message);
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    if (msg.includes('já existe') || msg.includes('exists')) {
      console.warn('⚠️ Usuário já existe, pulando registro');
    } else {
      console.error('❌ Erro no registro:', msg);
      throw err;
    }
  }
}

// Função para login de usuário
async function loginUser(user, label) {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email: user.email, password: user.password });
    console.log(`✅ Login de ${label}: OK`);
    return res.data.token;
  } catch (err) {
    console.error(`❌ Falha no login de ${label}:`, err.response?.data || err.message);
    throw err;
  }
}

// Função para criar grupo
async function createGroupTest() {
  if (!tokenPedro) {
    console.error('❌ Token Pedro não disponível. Grupo não será criado.');
    return;
  }
  try {
    const res = await axios.post(
      `${API_URL}/grupos`,
      { name: 'Grupo de Teste', members: [] },
      { headers: { Authorization: `Bearer ${tokenPedro}` } }
    );
    console.log('✅ Grupo criado:', res.data.data.name);
    groupId = res.data.data._id;
  } catch (err) {
    console.error('❌ Erro ao criar grupo:', err.response?.data || err.message);
  }
}

// Função para criar tarefas
async function createTaskTest() {
  if (!tokenPedro) {
    console.error('❌ Token Pedro não disponível. Tarefas não serão criadas.');
    return;
  }
  try {
    let res = await axios.post(
      `${API_URL}/tarefas/nova`,
      { title: 'Tarefa Individual Pedro' },
      { headers: { Authorization: `Bearer ${tokenPedro}` } }
    );
    console.log('✅ Tarefa individual criada:', res.data.data.title);
    taskPedroId = res.data.data._id;

    if (!groupId) {
      console.warn('⚠️ Grupo não existe. Tarefa de grupo não será criada.');
      return;
    }

    res = await axios.post(
      `${API_URL}/tarefas/nova`,
      { title: 'Tarefa do Grupo', groupId },
      { headers: { Authorization: `Bearer ${tokenPedro}` } }
    );
    console.log('✅ Tarefa de grupo criada:', res.data.data.title);
    taskGroupId = res.data.data._id;
  } catch (err) {
    console.error('❌ Erro ao criar tarefas:', err.response?.data || err.message);
  }
}

// Listar tarefas
async function listTasksTest() {
  try {
    if (tokenPedro) {
      const resPedro = await axios.get(`${API_URL}/tarefas/minhas`, { headers: { Authorization: `Bearer ${tokenPedro}` } });
      console.log('✅ Tarefas de PedroTest:', resPedro.data.data.map(t => t.title));
    }

    if (tokenAlice) {
      const resAlice = await axios.get(`${API_URL}/tarefas/minhas`, { headers: { Authorization: `Bearer ${tokenAlice}` } });
      console.log('✅ Tarefas de AliceTest:', resAlice.data.data.map(t => t.title));
    }
  } catch (err) {
    console.error('❌ Erro ao listar tarefas:', err.response?.data || err.message);
  }
}

// Alternar status de tarefa de grupo
async function toggleTaskTest() {
  if (!tokenAlice || !taskGroupId) {
    console.warn('⚠️ Token Alice ou taskGroupId não disponíveis. Toggle não será feito.');
    return;
  }
  try {
    const res = await axios.patch(
      `${API_URL}/tarefas/toggle/${taskGroupId}`,
      {},
      { headers: { Authorization: `Bearer ${tokenAlice}` } }
    );
    console.log('✅ Toggle status de "Tarefa do Grupo":', res.data.data.completed);
  } catch (err) {
    console.error('❌ Erro ao alternar status da tarefa:', err.response?.data || err.message);
  }
}

// Deletar tarefas
async function deleteTaskTest() {
  if (!tokenPedro) {
    console.warn('⚠️ Token Pedro não disponível. Não será possível deletar tarefas.');
    return;
  }
  try {
    if (taskPedroId) {
      await axios.delete(`${API_URL}/tarefas/${taskPedroId}`, { headers: { Authorization: `Bearer ${tokenPedro}` } });
    }
    if (taskGroupId) {
      await axios.delete(`${API_URL}/tarefas/${taskGroupId}`, { headers: { Authorization: `Bearer ${tokenPedro}` } });
    }
    console.log('✅ Tarefas deletadas');
  } catch (err) {
    console.error('❌ Erro ao deletar tarefas:', err.response?.data || err.message);
  }
}

// Função principal
async function runTests() {
  console.log('⚡ Iniciando testes integrados da API...');
  
  await registerUser(users.Pedro);
  await registerUser(users.Alice);

  tokenPedro = await loginUser(users.Pedro, 'PedroTest');
  tokenAlice = await loginUser(users.Alice, 'AliceTest');

  await createGroupTest();
  await createTaskTest();
  await listTasksTest();
  await toggleTaskTest();
  await deleteTaskTest();

  console.log('🎯 Testes integrados concluídos!');
}

runTests();
