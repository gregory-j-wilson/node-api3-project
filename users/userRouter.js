const express = require("express");

const router = express.Router();

const userDb = require("./userDb");
const postDb = require("../posts/postDb");





router.post("/", logger, validateUser, (req, res) => {
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



router.post("/:id/posts", logger, validateUserId, validatePost, (req, res) => {
  const newPost = req.body;

  postDb.insert(newPost)
    .then((post) => {
       postDb.get()
          .then((posts) => {
            res.status(201).json(posts)
          })
    })
    .catch((err) => {
      res.status(500).json({ error: "New post could not be posted." });
    });
});



router.get("/", logger, async (req, res) => {
  try {
    await userDb.get().then((resp) => {
      users = resp;
    });
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "users failed to load." });
  }
});



router.get("/:id", logger, validateUserId, async (req, res) => {
  try {
    await userDb.getById(req.params.id).then((resp) => {
      user = resp;
    });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "user failed to load." });
  }
});



router.get("/:id/posts", logger, validateUserId, (req, res) => {
   
    postDb.get()
      .then(posts => {
        filteredPosts = posts.filter((post) => Number(post.user_id) === Number(req.params.id))
        res.status(200).json(filteredPosts)
      })
      .catch(err => {
        res.status(500).json({ message: "Couldn't load posts for the specific user." });
      })

});




router.delete("/:id", logger, validateUserId, (req, res) => {
  
    userDb.remove(req.params.id)
      .then(number => {
        console.log(`${number} item(s) deleted.`)
        res.status(204).end()
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed." })
      })

});




router.put("/:id", logger, validateUserId, (req, res) => {

    const updatedUser = req.body
  
    userDb.update(req.params.id, updatedUser)
      .then(count => {
        console.log(`${count} user(s) updated.`)
        res.status(200).json(updatedUser)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be updated." })
      })

});




//custom middleware

function validateUserId(req, res, next) {
    userDb.getById(req.params.id)
      .then( user => { 
        console.log(`${user} id validated`)
        req.user = user
        next()
      })
      .catch(err => {
        res.status(500).json({error: "invalid user id" })
      })  
}


function validateUser(req, res, next) {

    try {
      if (!req.body) {
        res.status(400).json( { message: "missing user data" } )
      } else if (!req.body.name) {
        res.status(400).json( { message: "missing required name field" } )
      } 
      console.log('User is valid')
      next()
    } catch (error) {
      res.status(500).json( {message: "server cannot validate this user"})
    }   
}

function validatePost(req, res, next) {
  try {
    if (!req.body) {
      res.status(400).json( { message: "missing post data" } )
    } else if (!req.body.text) {
      res.status(400).json( { message: "missing text category" } )
    } 
    console.log('Post is valid')
    next()
  } catch (error) {
    res.status(500).json( {message: "server cannot validate this post"})
  }   
}

//---------------------------------

function logger(req, res, next) {
  console.log(
    `a ${req.method} request was made to ${req.url} at ${new Date().toISOString()}.`
  );
  next();
}


module.exports = router;
