var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  idAuthor: String,
  rating: Number
});

mongoose.model('Comment', CommentSchema);