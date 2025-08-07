const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  database: 'kamu_mikroblog',
  username: 'postgres',
  password: 'your_password',
});

module.exports = sequelize;
