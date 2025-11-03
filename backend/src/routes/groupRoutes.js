const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createGroup, getUserGroups } = require('../controllers/groupController');

router.post('/', verifyToken, createGroup);
router.get('/', verifyToken, getUserGroups);

module.exports = router;
