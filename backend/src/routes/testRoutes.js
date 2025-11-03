const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/verifica', verifyToken, (req, res) => {
    res.json({
        message: 'Acesso permitido á rota',
        userId: req.userId
    });
} );

module.exports = router;