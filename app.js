const express = require('express');
const db = require('./src/database');

const app = express();
const PORT = 3000;

// Middleware para a API entender JSON
app.use(express.json());

// Rota de teste da API
app.get('/', (req, res) => {
  res.send('API do Clube do Filme está no ar!');
});

// criar novo usuario
app.post('/users', async (req, res) => {
  // pega os dados do corpo (body) da requisição
  const { nome, email, senha } = req.body;

  // validação simples
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // importa o bcrypt e criptografa a senha
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashDaSenha = await bcrypt.hash(senha, salt);

    // insere o novo usuário no banco de dados usando o nome de tabela correto
    const resultado = await db.query(
      'INSERT INTO usuario (nome, email, senha, nivel) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, nivel',
      [nome, email, hashDaSenha, 'padrao']
    );

    const novoUsuario = resultado.rows[0];

    // retorna uma resposta de sucesso
    res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: novoUsuario });

  } catch (error) {
    console.error('❌ Erro CRÍTICO ao registrar usuário:', error);
    
    if (error.code === '23505') { // Código de erro do PostgreSQL para email duplicado
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});
// ---------------------------------------------------
//listar todos os usuarios
app.get('/users', async (req, res) => {
  try {
    // executa a consulta no banco para selecionar os dados dos usuários
    const resultado = await db.query(
      'SELECT id, nome, email, nivel FROM usuario'
    );

    // retorna a lista de usuários encontrados como um JSON
    res.status(200).json(resultado.rows);

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});
// ----------------------------------------------------

// Função para testar a conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🎉 Conexão com o banco de dados (PostgreSQL) bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  }
}

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  testDatabaseConnection();
});