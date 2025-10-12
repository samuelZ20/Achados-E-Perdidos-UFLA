// IMPORTAÇÕES
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./src/database');

//CONFIG
const app = express();
const PORT = 3000;
app.use(express.json()); // Middleware para a API entender JSON

// ROTAS

// rota de teste
app.get('/', (req, res) => {
  res.send('API do Clube do Filme está no ar!');
});

// registrar usuario
app.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashDaSenha = await bcrypt.hash(senha, salt);
    const resultado = await db.query(
      'INSERT INTO usuario (nome, email, senha, nivel) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, nivel',
      [nome, email, hashDaSenha, 'padrao']
    );
    res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: resultado.rows[0] });
  } catch (error) {
    console.error('❌ Erro CRÍTICO ao registrar usuário:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// listar todos os usuarios
app.get('/users', async (req, res) => {
  try {
    const resultado = await db.query('SELECT id, nome, email, nivel FROM usuario');
    
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('❌ Erro CRÍTICO ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

//login do usuario
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    
    const resultado = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const usuario = resultado.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = { id: usuario.id, nivel: usuario.nivel };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token: token });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

//TESTAR SERVIDOR E BANCO DE DADOS

// função para testar a conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    await db.query('SELECT NOW()');
    console.log('🎉 Conexão com o banco de dados (PostgreSQL) bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  }
}

// inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  testDatabaseConnection();
});