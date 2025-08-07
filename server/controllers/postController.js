const { Op } = require('sequelize');
const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { content, categoryId } = req.body;
  const user = await User.findByPk(req.user.id);
  const isVisible = user.role === 'newbie' ? false : true; // Çaylak gönderileri gizli
  const post = await Post.create({ content, UserId: req.user.id, CategoryId: categoryId, isVisible });
  await User.increment('postCount', { where: { id: req.user.id } });
  if (user.role === 'newbie' && user.postCount + 1 >= 10) {
    await User.update({ role: 'candidate' }, { where: { id: req.user.id } });
  }
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const whereClause = user.role === 'newbie' || user.role === 'candidate' ? { isVisible: true } : {};
  const posts = await Post.findAll({
    where: whereClause,
    include: [User],
    order: [['createdAt', 'DESC']],
  });
  res.json(posts);
};

exports.moderatePost = async (req, res) => {
  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  const { postId, isVisible, moderationNote } = req.body;
  await Post.update({ isVisible, moderationNote }, { where: { id: postId } });
  res.json({ message: 'Moderasyon tamamlandı' });
};

exports.deletePost = async (req, res) => {
  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  const { postId } = req.params;
  await Post.destroy({ where: { id: postId } });
  res.json({ message: 'Gönderi silindi' });
};
