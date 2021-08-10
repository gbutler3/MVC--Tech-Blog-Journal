const { post, user, comment } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

//getting all the comments on a particular post by id
router.get('/:id', withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
        const postData = await post.findOne({
            where: {
                id: req.params.id
            }
        })
        const currentpost = postData.get({ plain: true });
        res.render('comment', {post:currentpost, loggedIn: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
})

//entering a new comment on a particular post by id
router.post('/:id', withAuth, async (req, res) => {
    console.log('new comment hit')
    console.log(req.body)
    try {
        const newcomment = await comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id,
            username: req.session.username
        });
        res.status(200).json(newcomment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;