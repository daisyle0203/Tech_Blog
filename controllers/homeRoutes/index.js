// This contains all of the user-facing routes, such as the homepage, login ans signup page
const router = require('express').Router();
const sequelize = require('../config/connection');

// rendering all posts to homepage

// redirecting users to homepage once they log in

// rendering sign up page 

//rendering one post to the single-post page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

  res.render('login');
});

module.exports = router;
