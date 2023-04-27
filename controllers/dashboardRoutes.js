const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get route for main
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((PostData) => {
      // serialize data
      const posts = PostData.map((post) => post.get({ plain: true }));
      // do not let non users in
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "Post not found with this id" });
        return;
      }
      //   serialize data
      const post = PostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
