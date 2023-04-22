const router = require("express").Router();
const { User, Post } = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get the one user
router.get("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          // users posts
          model: Post,
          attributes: ["id", "title", "post_content"],
        },
        {
          // post on comment model - to see which posts user commented on
          model: Comment,
          attributes: ["id", "comment_text"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!userData) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logging in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect UserName or Password, please try again." });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect UserName or Password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: "Congratulations! You are logged in",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logging out
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    await req.session.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
