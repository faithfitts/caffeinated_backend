const mongoose = require('mongoose')
const commentSchema = require('./comment.js')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  comments: [commentSchema],
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
