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
		editMovie: function(req, res){
			console.log("en editar ",req.body);
			Movie.findById(req.body._id, function(err, movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{
					// se modifica la pelicula	
					//console.log("movie.year ",movie.year," req.body.year ",req.body.year);
					movie.title = req.body.title;
					movie.year = req.body.year;
					movie.runtime = req.body.runtime;
					movie.genre = req.body.genre;
					movie.director = req.body.director;
					movie.actors = req.body.actors;
					movie.plot = req.body.plot;
					movie.poster = req.body.poster;
					movie.save(function(err){
						if (err)
							console.log('error')
						else
							console.log('success')
					});
				}
			});			
			
		},
		deleteMovie: function(req, res, next){			
			console.log("pelicula a eliminar", req.movie);
			Movie.findById(req.movie._id, function(err,movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{
					movie.remove(function (err) {
						if (err) {return next(err)}
						else
							// if no error, your model is removed
							return next();
					});
				}
				
			});
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
		},		
		getMovieById: function(req, res, next, id){
			console.log("ID QUERY ", id);						
			var query = Movie.findById(id);			
			
			query.exec(function (err,movie){
				if (err) {return next(err);}
				if (!movie) {return next(new Error("Can't find movie"));}
				
				req.movie = movie;								
				return next();
			});
		},
		getLinkedObjectsOfMovie: function(req, res, next) {
		  //aca cargar los comentarios
		  console.log("pelicula es ",req.movie);
		  res.json(req.movie);
		}		
	}
})();