const router = require('express').Router();
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes');
const { Router } = require('express');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes)

module.exports = router;