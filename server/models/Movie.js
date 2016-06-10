var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

var MovieSchema = new mongoose.Schema({
  title: String,
  year: String,
  runtime: String,
  genre: String,
  director: String,
  actors: String,
  plot: String,
  poster: String,
  votes: Number,
  rating: Number,
  //keywords: [String],
  relatedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Movie', MovieSchema);

/* JSON devuelto por http://www.omdbapi.com/
{"Title":"Frozen",
"Year":"2013",
"Rated":"PG",
"Released":"27 Nov 2013",
"Runtime":"102 min",
"Genre":"Animation, Adventure, Comedy",
"Director":"Chris Buck, Jennifer Lee",
"Writer":"Jennifer Lee (screenplay), Hans Christian Andersen (story inspired by \"The Snow Queen\" by), Chris Buck (story by), Jennifer Lee (story by), Shane Morris (story by)",
"Actors":"Kristen Bell, Idina Menzel, Jonathan Groff, Josh Gad",
"Plot":"When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister, Anna, teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.",
"Language":"English, Icelandic","Country":"USA",
"Awards":"Won 2 Oscars. Another 70 wins & 56 nominations.",
"Poster":"http://ia.media-imdb.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg","Metascore":"74","imdbRating":"7.6","imdbVotes":"410,734",
"imdbID":"tt2294629",
"Type":"movie",
"Response":"True"}
*/
