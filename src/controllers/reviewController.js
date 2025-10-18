const db = require('../database');

const reviewController = {
  //CRIAR review
  async create(req, res) {
  //O id do filme virá dos parâmetros da rota
    const { filme_id } = req.params;
  // O ID do usuário virá do token JWT que o authMiddleware decodificou
    const { id: usuario_id } = req.user;
  //O conteúdo e a nota virão do corpo da requisição
    const { conteudo_texto, nota } = req.body;

    if (!conteudo_texto || !nota) {
      return res.status(400).json({ error: 'O conteúdo e a nota são obrigatórios.' });
    }

    try {
      const resultado = await db.query(
        'INSERT INTO review (conteudo_texto, nota, usuario_id, filme_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [conteudo_texto, nota, usuario_id, filme_id]
      );
      return res.status(201).json({ message: 'Review adicionada com sucesso!', review: resultado.rows[0] });
    } catch (error) {
      console.error('❌ Erro ao adicionar review:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  //LISTAR reviews de um filme específico
  async listByFilme(req, res) {
    const { filme_id } = req.params;
    try {
      const resultado = await db.query('SELECT * FROM review WHERE filme_id = $1', [filme_id]);
      return res.status(200).json(resultado.rows);
    } catch (error) {
      console.error('❌ Erro ao listar reviews:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = reviewController;