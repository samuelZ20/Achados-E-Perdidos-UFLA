const express= require ('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('API de Achados e Perdidos funcionando!');
});

app.listen(PORT, () =>{
    console.log('Servidor rodando na porta ' + PORT);
});