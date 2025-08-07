const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'moderator', 'category_moderator', 'member', 'candidate', 'newbie'), defaultValue: 'newbie' },
  rank: { type: DataTypes.ENUM('memur', 'sef', 'merkez_muduru', 'muduryardimcisi', 'mudur', 'daire_baskani', 'genel_mudur', 'baskan_yardimcisi', 'baskan'), defaultValue: 'memur' },
  avatar: { type: DataTypes.STRING },
  about: { type: DataTypes.STRING(150) },
  city: { type: DataTypes.STRING },
  profession: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  postCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = User;
