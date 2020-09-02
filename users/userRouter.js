const express = require("express");

const router = express.Router();

const userDb = require("./userDb");
const postDb = require("../posts/postDb");





router.post("/", logger, (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  userDb.insert(newUser)
    .then((user) => {
      userDb.get()
        .then((users) => {
        res.status(201).json(users);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "New user could not be posted." });
    });
});



router.post("/:id/posts", logger, (req, res) => {
  const newPost = req.body;

  postDb.insert(newPost)
    .then((post) => {
       postDb.get()
          .then((posts) => {
            res.status(201).json(posts)
          })
    })
    .catch((err) => {
      res.status(500).json({ error: "New user could not be posted." });
    });
});



router.get("/", async (req, res) => {
  try {
    await userDb.get().then((resp) => {
      users = resp;
    });
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "users failed to load." });
  }
});



router.get("/:id", async (req, res) => {
  try {
    await userDb.getById(req.params.id).then((resp) => {
      user = resp;
    });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "user failed to load." });
  }
});



router.get("/:id/posts", (req, res) => {
  // do your magic!
});




router.delete("/:id", (req, res) => {
  // do your magic!
});




router.put("/:id", (req, res) => {
  // do your magic!
});




//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

//---------------------------------

function logger(req, res, next) {
  console.log(
    `a ${req.method} request was made to ${
      req.url
    } at ${new Date().toISOString()}.`
  );

  next();
}

module.exports = router;
