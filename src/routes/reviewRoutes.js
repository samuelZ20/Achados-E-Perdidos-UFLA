const express = require('express');
// A opção { mergeParams: true } é importante para que o router de reviews consiga aceder ao :id do filme
const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

//rota para listar todas as reviews de um filme específico 
router.get('/', reviewController.listByFilme);

//rota para criar uma nova review para um filme específico
router.post('/', authMiddleware, reviewController.create);

module.exports = router;