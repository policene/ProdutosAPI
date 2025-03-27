const { DataTypes } = require('sequelize');
const db = require('../db');

module.exports = db.define('Product', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco_fornecedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});