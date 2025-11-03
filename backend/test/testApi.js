// testApi.js
const axios = require('axios');

const API_URL = 'http://localhost:5050/api';
let token = null;
let taskId = null;

// Dados de teste do usuário
const testUser = {
  username: 'PedroTest',
  email: 'pedrotest@example.com',
  password: '12345678'
};

// Função para registrar usuário
async function testRegister() {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registro:', res.data);
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.warn('⚠️ Usuário já existe, pulando registro');
    } else {
      console.error('❌ Erro no registro:', err.message);
    }
  }
}

// Função para login
async function testLogin() {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login:', res.data);
    token = res.data.token; // Salva token para chamadas autenticadas
  } catch (err) {
    console.error('❌ Erro no login:', err.message);
  }
}

// Função para criar tarefa
async function testCreateTask() {
  try {
    const res = await axios.post(`${API_URL}/tarefas/nova`, 
      { title: 'Minha primeira tarefa de teste' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Tarefa criada:', res.data);
    taskId = res.data.task._id; // Salva o ID da tarefa criada
  } catch (err) {
    console.error('❌ Erro ao criar tarefa:', err.response?.data || err.message);
  }
}

// Função para listar tarefas
async function testListTasks() {
  try {
    const res = await axios.get(`${API_URL}/tarefas/minhas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tarefas do usuário:', res.data);
  } catch (err) {
    console.error('❌ Erro ao listar tarefas:', err.response?.data || err.message);
  }
}

// Função para alternar status da tarefa
async function testToggleTask() {
  try {
    const res = await axios.patch(`${API_URL}/tarefas/toggle/${taskId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tarefa atualizada:', res.data);
  } catch (err) {
    console.error('❌ Erro ao atualizar tarefa:', err.response?.data || err.message);
  }
}

// Função para deletar tarefa
async function testDeleteTask() {
  try {
    const res = await axios.delete(`${API_URL}/tarefas/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tarefa deletada:', res.data);
  } catch (err) {
    console.error('❌ Erro ao deletar tarefa:', err.response?.data || err.message);
  }
}

// Função principal para rodar todos os testes em sequência
async function runTests() {
  console.log('⚡ Iniciando testes da API...');
  await testRegister();
  await testLogin();
  await testCreateTask();
  await testListTasks();
  await testToggleTask();
  await testDeleteTask();
  console.log('🎯 Todos os testes concluídos!');
}

runTests();
