const router = require('express').Router();

const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//all info on home page/ landing page
router.get('/', async (req, res) => {
  try {
    Post.findAll({
      include: [
        {
          model: user,
          attributes: ['id','username','email']
        }
      ]
    }).then(function (postData) {
      console.log(postData)
      res.render('homepage', { posts: postData, loggedIn: req.session.logged_in });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

//all posts to the dashboard page
router.get('/dashboard', withAuth, async (req, res) =>{
  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: {
      model: User,
      attributes: ['id', 'username', 'email']
    }
  })
  const posts = postData.map((post)=> post.get({ plain:true }))
  console.log(posts);
  res.render('dashboard', {logged_in:req.session.logged_in, posts})
});

router.get('/dashboard/post/:id', withAuth, async (req, res) => {
  try{
    const postData_db = await Post.findByPk(req.params.id,{
      include: [
        {
        model: User, 
        attributes: ['id', 'username', 'email']
        },
      ],
    });
    const post = postData_db.get({ plain:true });
    console.log(post);

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      }
    });
    if (commentData) {
      res.render('dashboardpost', {
        post: post, 
        comments: commentData, 
        loggedIn: req.session.loggedIn
      });
    } else {
      res.render('dashboardpost', {
        post: post, 
        loggedIn: req.session.logged_in
      });
    } 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/dashboard/post/:id', withAuth, async (req, res) => {
  console.log(req.params.id)
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: User,
        attributes: ['id','username', 'email']
      }
    })
    const posts = postData.map((post) => Post.get({ plain: true }))
    res.render('dashboard', {
      loggedIn: req.session.logged_in,
      posts,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/dashboard/post/:id', withAuth, async (req, res) => {
  try {
    const postUpdate = await Post.update({
      post_title: req.body.title,
      post_content: req.body.content,
    },      
    {
      where: {
        id: req.params.id,
      }
    })

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: user,
        attributes: ['id', 'username', 'email']
      }
    })
    const posts = postData.map((post) => Post.get({ plain: true }))
    res.render('dashboard', {
      loggedIn: req.session.logged_in,
      posts,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get("/api/user/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;