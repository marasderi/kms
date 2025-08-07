const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Story = sequelize.define('Story', {
  content: { type: DataTypes.STRING(280), allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
});

Story.belongsTo(User);

module.exports = Story;
