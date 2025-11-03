const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createTask, listTasks, toggleComplete, deleteTask } = require('../controllers/taskController');

router.post('/nova', verifyToken, createTask);
router.get('/minhas', verifyToken, listTasks);
router.patch('/toggle/:taskId', verifyToken, toggleComplete);
router.delete('/:taskId', verifyToken, deleteTask);

module.exports = router;
