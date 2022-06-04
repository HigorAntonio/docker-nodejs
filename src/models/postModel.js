const mongoose = require('../database');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have a title'],
  },
  body: {
    type: String,
    required: [true, 'Post must have body'],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
