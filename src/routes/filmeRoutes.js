const express = require('express');
const router = express.Router();

const filmeController = require('../controllers/filmeController');
const authMiddleware = require('../middlewares/authMiddleware');

//rotas para os filmes

// rota de listar todos os filmes
router.get('/', filmeController.listAll);

// rota para criar um novo filme, exige o login do usuario
router.post('/', authMiddleware, filmeController.create);

module.exports = router;