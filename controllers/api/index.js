const router = require('express').Router();

const userRoutes = require('./User-routes.js');
const postRoutes = require('./Post-routes');
const commentRoutes = require('./Comments-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
