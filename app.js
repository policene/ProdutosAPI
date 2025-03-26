const express = require('express'); // Importa o Express
const {pool, initializeDB} = require('./db'); // Importa o banco de dados
const app = express(); // Inicializa o app
const port = 3000; // Define a porta do servidor

// Middleware para interpretar JSON
app.use(express.json());

const produtos = [];

// Rota GET.
app.get('/produtos', async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar")
    }
});

// Rota POST.
app.post('/produtos', (req, res) => {

    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;

    pool.query('INSERT INTO products (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario]
    )

    res.status(201).send(req.body)

});

// Rota PUT.
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;

    pool.query('UPDATE products SET nome = $1, fornecedor = $2, endereco_fornecedor = $3, quantidade = $4, endereco = $5, preco_unitario = $6 WHERE id = $7',
        [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario, id]
    )

    res.status(200).send("Produto alterado no id: " + id)

})

// Rota DELETE.
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM products WHERE id = $1', [id])
    res.status(200).send("O produto com id " + id + " foi deletado");
})


// Iniciar o servidor
app.listen(port, async () => {
    console.log(`API está rodando.`);
    await initializeDB();
});