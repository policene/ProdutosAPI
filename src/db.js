const { Sequelize } = require('sequelize');
const Product = require('./models/product');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);


async function seedDatabase(){
    try {
        const count = await Product.count;
        if (count === 0) {
          await Product.bulkCreate([
            {
              nome: "Notebook Dell",
              fornecedor: "Dell Inc",
              endereco_fornecedor: "Rua Tech, 123",
              endereco: "Setor Eletrônicos, Corredor 5",
              quantidade: 50,
              valor_unitario: 4500.00
            },
            {
              nome: "Mouse Logitech",
              fornecedor: "Logitech",
              endereco_fornecedor: "Avenida Periférica, 456",
              endereco: "Setor Acessórios, Corredor 2",
              quantidade: 200,
              valor_unitario: 120.50
            }
          ]);
          console.log("Dados iniciais inseridos.");
        }
      } catch (error) {
        console.error("Erro ao inserir dados iniciais:", error);
      }
}

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco.');
    seedDatabase();
  })
  .catch(err => console.error('Erro ao conectar:', err));

module.exports = sequelize;