const express = require('express');
const router = express.Router();

// importa o cérebro (controller) e os seguranças (middlewares)
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// criar um novo usuário (CREATE)
router.post('/', userController.create);

//listar todos os usuários (READ)
router.get('/', [authMiddleware, adminMiddleware], userController.listAll);

// exporta o mapa de rotas
module.exports = router;