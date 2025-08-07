const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const storyController = require('../controllers/storyController');
const announcementController = require('../controllers/announcementController');
const categoryController = require('../controllers/categoryController');
const searchController = require('../controllers/searchController');

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Token gerekli' });
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
};

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth/me', authenticate, userController.getMe);
router.get('/users', authenticate, userController.getUsers);
router.post('/users/:userId/ban', authenticate, userController.banUser);
router.post('/users/:userId/role', authenticate, userController.updateRole);
router.post('/posts', authenticate, postController.createPost);
router.get('/posts', authenticate, postController.getPosts);
router.post('/posts/:postId/moderate', authenticate, postController.moderatePost);
router.delete('/posts/:postId', authenticate, postController.deletePost);
router.post('/stories', authenticate, storyController.createStory);
router.get('/stories', storyController.getStories);
router.post('/announcements', authenticate, announcementController.createAnnouncement);
router.get('/announcements', announcementController.getAnnouncements);
router.post('/categories', authenticate, categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/search', authenticate, searchController.searchPosts);

module.exports = router;
