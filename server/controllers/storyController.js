const Story = require('../models/Story');

exports.createStory = async (req, res) => {
  const { content } = req.body;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat
  const story = await Story.create({ content, UserId: req.user.id, expiresAt });
  res.json(story);
};

exports.getStories = async (req, res) => {
  const stories = await Story.findAll({ where: { expiresAt: { [Op.gt]: new Date() } } });
  res.json(stories);
};
