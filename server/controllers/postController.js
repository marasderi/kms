const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { content, categoryId } = req.body;
  const post = await Post.create({ content, UserId: req.user.id, CategoryId: categoryId });
  await User.increment('postCount', { where: { id: req.user.id } });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: [User] });
  res.json(posts);
};
