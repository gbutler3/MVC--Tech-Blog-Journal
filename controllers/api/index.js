const router = require('express').Router();
const { route } = require('../homeRoutes');
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes);

module.exports = router;