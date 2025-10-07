# 1. IMAGEM BASE: Começamos com uma imagem oficial do Node.js.
FROM node:18

# 2. DIRETÓRIO DE TRABALHO: Criamos uma pasta /app dentro do container.
WORKDIR /app

# 3. DEPENDÊNCIAS: Copiamos os arquivos de manifesto do projeto.
COPY package*.json ./

# 4. INSTALAÇÃO: Rodamos o npm install DENTRO do container.
RUN npm install

# 5. CÓDIGO-FONTE: Copiamos o resto do código da aplicação.
COPY . .

# 6. PORTA: Informamos ao Docker que nossa aplicação usa a porta 3000.
EXPOSE 3000

# 7. COMANDO DE EXECUÇÃO: O comando para iniciar a aplicação.
CMD [ "node", "app.js" ]