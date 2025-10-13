const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  //pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  // verifica se o token foi enviado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O token vem no formato "Bearer [token]"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato de token inválido.' });
  }
  const token = parts[1];

  // verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }

    // se o token for válido, adicionamos os dados do usuário (payload) na requisição
    req.user = decoded;

    // libera o acesso para a próxima função (a rota em si)
    return next();
  });
}

module.exports = authMiddleware;