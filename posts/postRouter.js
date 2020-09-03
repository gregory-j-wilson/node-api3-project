const express = require('express');

const router = express.Router();

const db = require('./postDb')


// router.use(logger)




router.get('/', logger, (req, res) => {

  db.get()
    .then(posts => {
        res.status(200).json(posts)
        console.log('Here are all the posts!')
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't load posts for the specific user." });
    })

});

router.get('/:id', logger, validatePostId, (req, res) => {
  
  db.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't load the post." });
    })
});

router.delete('/:id', logger, validatePostId, (req, res) => {
    db.remove(req.params.id)
      .then(number => {
        console.log(`${number} item(s) deleted.`)
        res.status(204).end()
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed." })
      })
});

router.put('/:id', logger, validatePostId, (req, res) => {
  
  const updatedPost = req.body
  
    db.update(req.params.id, updatedPost)
      .then(count => {
        console.log(`${count} user(s) updated.`)
        res.status(200).json(updatedPost)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The post could not be updated." })
      })

});

// custom middleware

function validatePostId(req, res, next) {
    db.getById(req.params.id)
        .then(post => {
            if (post) {
                console.log("post is valid");
                next();
            } else {
                res.status(400).json({ message: "invalid user id" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
 
}

function logger(req, res, next) {
  console.log(`a ${req.method} request was made to ${req.url} at ${new Date().toISOString()}.`);
  next()
}

module.exports = router;

