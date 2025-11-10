# ToDo+

![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

---

## Visão Geral

**ToDo+** é uma aplicação **full-stack** moderna desenvolvida com **React**, **Node.js** e **MongoDB**.  
Seu objetivo é oferecer uma experiência fluida e responsiva para o gerenciamento de tarefas, com autenticação segura e interface intuitiva.

O projeto aplica boas práticas de arquitetura, componentização e design, integrando animações leves, feedback visual e persistência de dados.

---

## Funcionalidades

### Frontend
- **Gerenciamento de Tarefas:** criação, edição, exclusão e marcação de concluídas.  
- **Feedback Visual:** efeitos com `framer-motion` e `canvas-confetti`.  
- **Filtros Dinâmicos:** exibição personalizada por status.  
- **Design Responsivo:** suporte completo para dispositivos móveis e desktop.  
- **Temas Claro e Escuro:** alternância via Tailwind CSS.  
- **Navegação SPA:** uso de `react-router-dom` para rotas fluidas.  

### Backend
- **API RESTful:** CRUD completo de tarefas e usuários.  
- **Autenticação JWT:** sessões seguras e persistentes.  
- **Criptografia com Bcrypt:** proteção de credenciais.  
- **Validação com Express Validator:** entrada de dados sanitizada.  
- **Banco de Dados MongoDB:** integração com Mongoose.  
- **CORS e Dotenv:** segurança e configuração por ambiente.  

---

## Tecnologias Utilizadas

### Frontend
| Tecnologia | Descrição |
|-------------|------------|
| [React 18](https://react.dev/) | Biblioteca principal de UI |
| [Vite](https://vitejs.dev/) | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária |
| [Axios](https://axios-http.com/) | Requisições HTTP |
| [React Router DOM](https://reactrouter.com/) | Gerenciamento de rotas SPA |

### Backend
| Tecnologia | Descrição |
|-------------|------------|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Express](https://expressjs.com/) | Framework web backend |
| [Mongoose](https://mongoosejs.com/) | ODM para MongoDB |
| [JWT](https://jwt.io/) | Autenticação baseada em token |
| [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) | Hashing de senhas |
| [Express Validator](https://express-validator.github.io/) | Validação de dados |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Variáveis de ambiente |
| [Cors](https://www.npmjs.com/package/cors) | Controle de acesso CORS |

---

## 🗂 Estrutura do Projeto

```bash
 
├── frontend/
│   ├── src/
│   │   ├── components/     # Botões, formulários, listas e animações
│   │   ├── pages/          # Páginas principais (Home, Login, Register)
│   │   ├── hooks/          # Hooks personalizados (ex: useTasks)
│   │   ├── services/       # Requisições Axios para o backend
│   │   ├── styles/         # Tailwind e estilos globais
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    │   └── db.js           # Conexão com MongoDB
    ├── controllers/        # Lógica de autenticação e tarefas
    ├── middleware/         # Auth e validações
    ├── models/             # Schemas do Mongoose
    ├── routes/             # Endpoints de usuários e tarefas
    ├── server.js           # Ponto de entrada da aplicação
    └── package.json

    ## Instalação e Execução

Execute os comandos abaixo para clonar o repositório, instalar as dependências do frontend e backend, configurar o ambiente e iniciar o projeto localmente:

```bash
# Clonar o repositório
git clone https://github.com/PedroVieir/ToDo-Plus.git

# Instalar dependências do frontend e backend
cd ToDo-Plus/frontend && npm install
cd ../backend && npm install

# Criar arquivo .env com variáveis de ambiente
echo "PORT=5000
MONGO_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta" > .env

# Iniciar backend
npm start

# Iniciar frontend
cd ../frontend && npm run dev

