require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool ({
     host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

const initializeDB = async() => {
    try {
        const {row_count} = await pool.query('SELECT * FROM products');
        if (row_count === 0) {
            await pool.query(`INSERT INTO products (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES
                ('Teclado Mecânico RGB', 'TechGear Ltda', 'Av. dos Eletrônicos, 123 - São Paulo, SP', 50, 'Rua das Lojas, 456 - Rio de Janeiro, RJ', 249.99),
                ('Monitor 27" 144Hz', 'VisionTech SA', 'Rua das Indústrias, 789 - Curitiba, PR', 30, 'Av. Central, 101 - Belo Horizonte, MG', 1299.90),
                ('Mouse Gamer 8000 DPI', 'GamerX Imports', 'Travessa dos Importados, 321 - Porto Alegre, RS', 100, 'Rua Principal, 202 - Salvador, BA', 199.50),
                ('Cadeira Ergonômica Pro', 'OfficeComfort', 'Alameda das Fábricas, 654 - Fortaleza, CE', 20, 'Estrada das Empresas, 303 - Recife, PE', 899.00);
                `);
        } else {
            console.log("Já tem registros.")
        }
    } catch (err) {
        console.error("Deu ruim bicho. ", err)
    }
}

module.exports = {pool, initializeDB};