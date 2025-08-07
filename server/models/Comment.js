const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.STRING(280), allowNull: false },
});

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;
