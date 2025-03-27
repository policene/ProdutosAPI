const Product = require("../models/product");

async function findAll(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, {
          where: { id }
        });
    
        if (updated) {
          const updatedProduct = await Product.findByPk(id);
          return res.status(200).json(updatedProduct);
        }
    
        throw new Error('Produto não encontrado.');
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
          where: { id }
        });
    
        if (deleted) {
          return res.status(204).send();
        }
    
        throw new Error('Produto não encontrado.');
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
  findAll,
  addProduct,
  updateProduct,
  deleteProduct
};