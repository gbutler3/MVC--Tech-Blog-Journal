const user = require('./user');
const post = require('./post');
const comment = require('./comment');

//Break down of associations:
  // users can have many posts and comments
  // posts belong to users, and can have many comments
  // comments belong to users, and belong to posts

//creating the associations 
user.hasMany(post, {
  foreignKey:'user_id',
  onDelete: 'CASCADE'
});

user.hasMany(comment,{
  foreignKey: 'user_id'
});

post.belongsTo(user,{
  foreignKey: 'user_id'
});

post.hasMany(comment,{
  foreignKey: 'post_id'
});

comment.belongsTo(user,{
  foreignKey: 'user_id'
});

comment.belongsTo(post,{
  foreignKey: 'post_id'
});

module.exports = { user, post, comment };