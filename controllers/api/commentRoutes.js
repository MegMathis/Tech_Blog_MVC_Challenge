const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create comment - async not working
router.post("/", withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.session.post_id,
  })
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete one comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: "Comment not found with that id" });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
