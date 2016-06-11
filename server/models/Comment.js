var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  idAuthor: String,
  rating: Number,
  //movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

mongoose.model('Comment', CommentSchema);