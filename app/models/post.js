const mongoose = require('mongoose')
const reviewSchema = require('./review.js')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  reviews: [reviewSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
