const User = require('./User');
const Post = require('./post');
const Comment = require('./Comment');

//Break down of associations:
  // Users can have many posts and Comments
  // posts belong to Users, and can have many Comments
  // Comments belong to Users, and belong to posts

//creating the associations 
User.hasMany(Post, {
  foreignKey:'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment,{
  foreignKey: 'user_id'
});

Post.belongsTo(User,{
  foreignKey: 'user_id'
});

Post.hasMany(Comment,{
  foreignKey: 'post_id'
});

Comment.belongsTo(User,{
  foreignKey: 'user_id'
});

Comment.belongsTo(Post,{
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };