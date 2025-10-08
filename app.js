const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./src/database');

app.get('/', (req, res) => {
  res.send('API do Achados e Perdidos UFLA está no ar!');
});

// A função que testa a conexão
async function testDatabaseConnection() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🎉 Conexão com o banco de dados (PostgreSQL) bem-sucedida!');
    console.log('   -> Resposta do banco:', result.rows[0]); 
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  }
}

// O trecho que inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  
  // A LINHA CRUCIAL QUE ESTAVA FALTANDO:
  testDatabaseConnection(); 
});