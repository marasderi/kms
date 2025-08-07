const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const emailDomain = email.split('@')[1];
  const govDomains = ['gov.tr', 'bel.tr', 'pol.tr', 'org.tr', 'edu.tr', 'k12.tr', 'tsk.tr'];
  const role = govDomains.includes(emailDomain) ? 'member' : 'newbie';

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword, role });

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json(user);
};

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};
