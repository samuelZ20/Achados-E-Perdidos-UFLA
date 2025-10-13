function adminMiddleware(req, res, next) {
  // Assumimos que o authMiddleware já rodou e adicionou o req.user
  const { nivel } = req.user;

  if (nivel !== 'admin') {
    // Se o usuário não for um administrador, barramos o acesso.
    return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
  }

  // Se for um admin, liberamos o acesso.
  return next();
}

module.exports = adminMiddleware; // Exporta APENAS o adminMiddleware