const express = require('express'); // Importa o Express
const app = express(); // Inicializa o app
const port = 3000; // Define a porta do servidor

// Middleware para interpretar JSON
app.use(express.json());

const produtos = [];

// Rota inicial
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

app.post('/produtos', (req, res) => {
    produtos.push(req.body);
    res.status(201).json(req.body);
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`API está rodando.`);
});