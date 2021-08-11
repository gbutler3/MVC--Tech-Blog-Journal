const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//getting posts by id
router.get('/:id', async (req, res) => {
  console.log(req.session);
  try {
    const dbpostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    const post = dbpostData.get({ plain: true });
    console.log(post);

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      raw: true,
    });
    if (commentData) {
      res.render('posts', {
        post: post,
        comments: commentData,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.render('posts', { post: post, loggedIn: req.session.logged_in });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//creating a new post
router.post('/create', async function (req, res) {
  console.log(req.body);
  console.log(req.session);
  var newpost = {
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  }
  const created = await Post.create(newpost)
  res.json(created)
});

//update the post by id
router.get('/dashboard/postupdate/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    const currentpost = postData.get({ plain: true });
    res.render('postupdate', { currentpost, loggedIn: req.session.logged_in })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;