var mongoose = require('mongoose');

var Movie = mongoose.model('Movie');

module.exports = (function(){
	return{
		createMovie: function(req, res){
			console.log('en controlador movies');
			var movie = new Movie({
				title: req.body.title,
				year: req.body.year,
				runtime: req.body.runtime,
				genre: req.body.genre,
				director: req.body.director,
				actors: req.body.actors,
				plot: req.body.plot,
				poster: req.body.poster
			});
			movie.save(function(err, movie){
				if(err){
					res.json({err:err});
				}
				else{
					res.json(movie);
				}
			})
		},
		getAllMovies: function(req, res, next){
			Movie.find(function(err,results){
				if (err){
					next(err);
				}
				else{
					res.json(results);
				}
			})
		}
	}
})();