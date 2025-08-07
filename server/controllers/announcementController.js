const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Yetkisiz' });
  const { content } = req.body;
  const announcement = await Announcement.create({ content });
  res.json(announcement);
};

exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.findAll();
  res.json(announcements);
};
