const { Op } = require('sequelize');
const Post = require('../models/Post');

exports.searchPosts = async (req, res) => {
  const { query } = req.query;
  const posts = await Post.findAll({
    where: {
      content: { [Op.match]: sequelize.fn('to_tsquery', 'turkish', query) },
    },
    include: ['User'],
  });
  res.json(posts);
};
