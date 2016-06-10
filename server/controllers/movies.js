var mongoose = require('mongoose');

var Movie = mongoose.model('Movie');


module.exports = (function(){
	return{
		createMovie: function(req, res){
			if (req.user.type != "admin") {
				var error = new Error('no eres admin ');
				return next(error);
			}
			console.log('en controlador movies');
			var movie = new Movie({
				title: req.body.title,
				year: req.body.year,
				runtime: req.body.runtime,
				genre: req.body.genre,
				director: req.body.director,
				actors: req.body.actors,
				plot: req.body.plot,
				poster: req.body.poster,
				rating: 0,
				votes: 0
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
			if (req.user == null) {
				var error = new Error('no eres admin ');
				return next(error);
			}
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

		setRating: function(req, res){
			if (req.user != null) {
				var error = new Error('no eres admin ');
				return next(error);
			}
			console.log("entro a setRating");
			Movie.findById(req.body._id, function(err, movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{
					// se modifica la pelicula
					movie.rating = (req.body.rating + movie.rating) / (movie.votes + 1);
					movie.votes = movie.votes + 1;
					console.log(movie);
					console.log("por salvar");
					movie.save(function(err){
						if (err) {
							console.log("en error");
            	res.status(500).json({ error: "save failed", err: err});
		        } else {
								console.log('success')
		            res.status(201).json(movie);
		        }
					});
				}
			});
		},
		deleteMovie: function(req, res, next){
			if (req.user.type != "admin") {
				var error = new Error('no eres admin ');
				return next(error);
			}
			console.log("pelicula a eliminar", req.movie);
			Movie.findById(req.movie._id, function(err,movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{
					movie.remove(function (err) {
						console.log(err);
						if (err!=null) {return next(err)}
						else
							// if no error, your model is removed
							res.status(200).send();
					});
				}

			});
		},
		getAllMovies: function(req, res, next){
			Movie.find()
				 .populate('relatedMovies')
				 .exec(function(err,results){
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

			Movie.findById(id)
				 .populate('relatedMovies')
				 .exec(function(err,movie){
					if (err) {return next(err);}
					if (!movie) {return next(new Error("Can't find movie"));}

					req.movie = movie;
					return next();
				 });

			/*var query = Movie.findById(id);

			query.exec(function (err,movie){
				if (err) {return next(err);}
				if (!movie) {return next(new Error("Can't find movie"));}

				req.movie = movie;
				return next();
			});*/
		},
		getLinkedObjectsOfMovie: function(req, res, next) {
		  //aca cargar los comentarios
		  console.log("pelicula es ",req.movie);
		  res.json(req.movie);
		},
		addRelatedMovie: function(req, res, next){
			if (req.user != null) {
				var error = new Error('no eres admin ');
				return next(error);
			}
			console.log("pelicula a modificar", req.movie);
			console.log("cuerpo mensaje ",req.body);

			Movie.findById(req.movie._id)
				 .populate('relatedMovies')
				 .exec(function(err,movie){
					 console.log("related movies es ",movie.relatedMovies);
					 if (err) {return next(err);}
					 var existe = false;
					 movie.relatedMovies.forEach(function(relMovie){
						 console.log("relMovie._id ",relMovie._id," req.body ",req.body._id);
						if (relMovie._id == req.body._id) existe=true;
					 });

					 if (!existe){
						 console.log("en el if");
						 movie.relatedMovies.push(req.body);
						 movie.save(function(err, post) {
							if(err){ return next(err); }

							res.json(movie);
						});
					 }
					 else{
						 console.log("en el else");
						 return next();
						}

				 });

		},
		deleteRelatedMovie: function(req, res, next){
			if (req.user.type != "admin") {
				var error = new Error('no eres admin ');
				return next(error);
			}
			//console.log("movie ",req.params.movie," req.params.relatedMovie ", req.params.relatedMovie);
			//recupero aca los parametros porque en routes.js solo
			//recupera un solo document y es bastante confuso
			//dejar media consulta aca y media consulta en routes.js
			var idPeliculaModificar = req.params.movie;
			var relatedMovieId = req.params.relatedMovie;

			Movie.findById(idPeliculaModificar)
				 .populate('relatedMovies')
				 .exec(function(err,movie){
					 console.log("related movies es ",movie.relatedMovies);
					 if (err) {return next(err);}
					 var encontrado = false;
					 var aSacar = null;
					 movie.relatedMovies.forEach(function(relMovie){
						if (relMovie._id == relatedMovieId){
							encontrado=true;
							aSacar=relMovie;
						}
					 });

					 if (encontrado){
						 //si estaba lo saco y guardo los cambios
						 console.log("en el if");
						 movie.relatedMovies.pull(aSacar);
						 movie.save(function(err, post) {
							if(err){ return next(err); }

							res.json(movie);
						});
					 }
					 else{
						 console.log("en el else");
						 return next();
						}

				 });

		}
	}
})();
