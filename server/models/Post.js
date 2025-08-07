const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Post = sequelize.define('Post', {
  content: { type: DataTypes.STRING(280), allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Post.belongsTo(User);
Post.belongsTo(Category);

module.exports = Post;
