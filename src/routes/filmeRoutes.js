const express = require('express');
const router = express.Router();

const filmeController = require('../controllers/filmeController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const reviewRoutes = require('./reviewRoutes');
//rotas para os filmes

// rota de listar todos os filmes
router.get('/', filmeController.listAll);

// rota para criar um novo filme, exige o login do usuario
router.post('/', authMiddleware, filmeController.create);

//rota para atualizar filme pelo id
router.put('/:id', [authMiddleware, adminMiddleware], filmeController.update);

//rota para deletar filme pelo id
router.delete('/:id', [authMiddleware, adminMiddleware], filmeController.deleteById);

//rota para reviews de um filme específico
router.use('/:filme_id/reviews', reviewRoutes);

module.exports = router;

