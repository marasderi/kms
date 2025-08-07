const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Yetkisiz' });
  const { name, description } = req.body;
  const category = await Category.create({ name, description });
  res.json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};
