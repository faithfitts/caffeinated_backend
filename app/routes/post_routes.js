// require the express library
const express = require('express')
// authentication middleware for Node.js
const passport = require('passport')

// logic to handle errors and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership

// middleware that allows user to update a single field at a time
const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('../models/post')

// pass this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// also sets `res.user`
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

// INDEX USER-POST
// GET /posts/user
router.get('/posts/user', requireToken, (req, res, next) => {
  Post.find({ owner: req.user._id })
    .populate('owner', '_id email')
    .then(post => {
      res.status(200).json({ post: post })
    })
    .catch(next)
})

// INDEX ALL-POST
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
    .populate('reviews.owner')
    .then(handle404)
    .then(post => {
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
