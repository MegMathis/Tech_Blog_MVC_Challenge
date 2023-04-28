// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

// single user can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Posts can belong to user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// user can have a comment
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// a post can have comments
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

// a single user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// a single post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
