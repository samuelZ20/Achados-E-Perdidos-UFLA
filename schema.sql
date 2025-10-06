CREATE TABLE `Usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nivel` varchar(50) DEFAULT 'padrao',
  `data_criacao` timestamp
);

CREATE TABLE `Localizacao` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) UNIQUE NOT NULL,
  `descricao` text
);

CREATE TABLE `Item` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `foto_url` varchar(255),
  `status` varchar(50) DEFAULT 'perdido',
  `data_registro` timestamp,
  `usuario_id` int NOT NULL,
  `localizacao_id` int NOT NULL
);

ALTER TABLE `Item` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`);

ALTER TABLE `Item` ADD FOREIGN KEY (`localizacao_id`) REFERENCES `Localizacao` (`id`);
