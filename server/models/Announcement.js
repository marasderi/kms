const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Announcement = sequelize.define('Announcement', {
  content: { type: DataTypes.STRING(1000), allowNull: false },
});

module.exports = Announcement;
