var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  idAuthor: Number,
  rating: Number,
  //movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

mongoose.model('Comment', CommentSchema);