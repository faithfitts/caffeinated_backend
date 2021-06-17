const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('../models/post')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE post
// POST /posts
router.post('/posts', requireToken, (req, res, next) => {
  const postData = req.body.post
  postData.owner = req.user._id
  Post.create(postData)
    .then(post => res.status(201).json({ post: post }))
    .catch(next)
})

// INDEX ALL
// GET /posts
router.get('/posts', requireToken, (req, res, next) => {
  Post.find()
    .populate('owner')
    .then(post => {
      res.status(200).json({ post: post })
    })
    .catch(next)
})

// SHOW one post
// GET /post/:id
router.get('/posts/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Post.findOne({ _id: id })
    .populate('owner')
    .populate('comments.owner')
    .then(handle404)
    .then(post => {
      // console.log(post)
      res.status(200).json({ post: post })
    })
    .catch(next)
})

// UPDATE post
// PATCH /posts/:id
router.patch('/posts/:id', requireToken, removeBlanks, (req, res, next) => {
  const postData = req.body.post
  delete postData.owner
  const postId = req.params.id
  const userId = req.user._id
  Post.findOne({_id: postId, owner: userId})
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      return post.updateOne(postData)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE post
// DELETE /posts/:id
router.delete('/posts/:id', requireToken, (req, res, next) => {
  const postId = req.params.id
  const userId = req.user._id
  Post.findOne({_id: postId, owner: userId})
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      return post.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
