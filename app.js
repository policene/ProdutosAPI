const express = require('express'); // Importa o Express
const {pool, initializeDB} = require('./db'); // Importa o banco de dados
const app = express(); // Inicializa o app
const port = 3000; // Define a porta do servidor

// Middleware para interpretar JSON
app.use(express.json());

const produtos = [];

// Rota get.
app.get('/produtos', async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar")
    }
});

app.post('/produtos', (req, res) => {
    produtos.push(req.body);
    res.status(201).json(req.body);
});


// Iniciar o servidor
app.listen(port, async () => {
    console.log(`API está rodando.`);
    await initializeDB();
});