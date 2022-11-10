const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// dashboard displaying posts created by logged in users 
router.get('/', (req, res) => {
    res.render('dashboard');
  });

// rendering edit page
router.get('/edit/:id', (req, res) => {
    res.render('edit-posts');
  });

// rendering new post page 
router.get('/newpost', (req, res) => {
    res.render('new-posts');
  });

module.exports = router;