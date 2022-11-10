// This contains all of the user-facing routes, such as the homepage, login and signup page
const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Post, User } = require('../../models');

// rendering all posts on homepage
router.get("/", async (req, res) => {
  console.log(req.session);
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        // {
        //   model: Comment,
        //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //   include: {
        //     model: User,
        //     attributes: ['username']
        //   }
        // },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn
    })
  } catch (error) {
    res.status(500).json(error);
  }
})

// rendering the login page
// redirecting users to homepage once they log in
router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/');
    return; 
}
  res.render('login');
});

// rendering sign up page 
router.get('/signup', (req, res) => {
  res.render('signup');
});

// rendering one post to the single-post page
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        // {
        //   model: Comment,
        //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //   include: {
        //     model: User,
        //     attributes: ['username']
        //   }
        // },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true })

    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn
    })
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;