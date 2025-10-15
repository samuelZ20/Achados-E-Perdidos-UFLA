const db = require('../database');

const filmeController = {
  //CRIAR um novo filme
  async create(req, res) {
    const { titulo, diretor, ano, sinopse } = req.body;
    if (!titulo) {
      return res.status(400).json({ error: 'O título é obrigatório.' });
    }
    try {
      const resultado = await db.query(
        'INSERT INTO filme (titulo, diretor, ano, sinopse) VALUES ($1, $2, $3, $4) RETURNING *',
        [titulo, diretor, ano, sinopse]
      );
      return res.status(201).json({ message: 'Filme adicionado com sucesso!', filme: resultado.rows[0] });
    } catch (error) {
      console.error('❌ Erro ao adicionar filme:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  //LISTAR todos os filmes
  async listAll(req, res) {
    try {
      const resultado = await db.query('SELECT * FROM filme');
      return res.status(200).json(resultado.rows);
    } catch (error) {
      console.error('❌ Erro ao listar filmes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = filmeController;