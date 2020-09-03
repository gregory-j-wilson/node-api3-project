const express = require('express');

const router = express.Router();

const db = require('./postDb')


router.use(logger)




router.get('/', logger, (req, res) => {
  
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  next()
}

function logger( req, res, next ) {
  console.log(`a ${req.method} request was made to ${req.url} at ${new Date().toISOString()}.`);

  next()
}

module.exports = router;

