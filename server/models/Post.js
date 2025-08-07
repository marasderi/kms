const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Post = sequelize.define('Post', {
  content: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  isVisible: { type: DataTypes.BOOLEAN, defaultValue: false },
  moderationNote: { type: DataTypes.TEXT },
  UserId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  CategoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Post.belongsTo(User);
Post.belongsTo(Category);

module.exports = Post;
