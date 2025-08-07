const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(500) },
});

module.exports = Category;
