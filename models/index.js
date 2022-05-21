const User = require('./user');
const Post = require('./post');
const Vote = require('./vote');
const Comment = require('./comments');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});
//With these two .belongsToMany() methods in place, we're allowing both the User and Post models to query each other's information in the context of a vote.
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_post',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'post_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: ' user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment,{
    foreignKey:'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Vote, Comment };