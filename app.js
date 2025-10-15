// importações
const express = require('express');
const db = require('./src/database');

// importando as rotas
const userRoutes = require('./src/routes/userRoutes');
const filmeRoutes = require('./src/routes/filmeRoutes');
// (No futuro, você importará as rotas de filmes e reviews aqui também)

//config inicial
const app = express();
const PORT = 3000;
app.use(express.json());


// rota de teste
app.get('/', (req, res) => {
  res.send('API do Clube do Filme está no ar!');
});

//principais rotas
app.use('/users', userRoutes);
app.use('/filmes', filmeRoutes);

// A rota de login agora será separada
const userController = require('./src/controllers/userController');
app.post('/login', userController.login);


// --- Função de Teste e Inicialização ---

async function testDatabaseConnection() {
  try {
    await db.query('SELECT NOW()');
    console.log('🎉 Conexão com o banco de dados (PostgreSQL) bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  testDatabaseConnection();
});