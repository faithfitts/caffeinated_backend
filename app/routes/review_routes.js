const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const handle404 = errors.handle404
const requireOwnership = errors.requireOwnership

const Post = require('../models/post')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE review
// POST /reviews
router.post('/reviews', requireToken, (req, res, next) => {
  const reviewData = req.body.review
  reviewData.owner = req.user._id
  const postId = reviewData.postId
  Post.findById(postId)
    .populate('owner', '_id email')
    .populate('reviews', 'owner content')
    .then(handle404)
    .then(post => {
      post.reviews.push(reviewData)
      return post.save()
    })
    .then(post => {
      const lastreviewPosition = (post.reviews.length - 1)
      const newreview = post.reviews[lastreviewPosition]
      return newreview
    })
    .then((newreview) => res.status(201).json({ newreview }))
    .catch(next)
})

// UPDATE review
// PATCH /reviews/:reviewId
router.patch('/reviews/:reviewId', requireToken, (req, res, next) => {
  // extract reviewID
  const reviewId = req.params.reviewId
  // extract review data
  const reviewData = req.body.review
  // extract Post Id
  const postId = req.body.review.postId
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.review.owner

  Post.findById(postId)
    .populate('owner', '_id email')
    .then(handle404)
    .then(post => {
      const review = post.reviews.id(reviewId)
      requireOwnership(req, review)

      review.set(reviewData)
      return post.save()
    })
    .then(post => {
      const lastreviewPosition = (post.reviews.length - 1)
      const updatedreview = post.reviews[lastreviewPosition]
      return updatedreview
    })
    .then((updatedreview) => res.status(201).json({ updatedreview }))
    .catch(next)
})

// DELETE review
// DELETE /reviews/:reviewId
router.delete('/reviews/:reviewId', requireToken, (req, res, next) => {
  const reviewId = req.params.reviewId

  // extract post id
  const postId = req.body.review.postId

  Post.findById(postId)
    .then(handle404)
    .then(post => {
      const review = post.reviews.id(reviewId)
      requireOwnership(req, review)

      review.remove()

      return post.save()
    })
    .then(post => res.status(201).json({ post: post }))
    .catch(next)
})

module.exports = router