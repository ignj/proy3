var mongoose = require('mongoose');


var Movie = mongoose.model('Movie');
var Comment = mongoose.model('Comment');

module.exports = (function(){
	return{
		createMovie: function(req, res){
			if (req.user.type != "admin") {
 				var error = new Error('no eres admin ');
 				return next(error);
 			}
			var movie = new Movie({
				title: req.body.title,
				year: req.body.year,
				runtime: req.body.runtime,
				genre: req.body.genre,
				director: req.body.director,
				actors: req.body.actors,
				plot: req.body.plot,
				poster: req.body.poster,
				relatedMovies: [],
				comments: [],				
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
			Movie.findById(req.body._id, function(err, movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{			
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
							return next(new Error('Could not save Document'));
						else
							return res.json(movie);
					});
				}
			});
		},	
		deleteMovie: function(req, res, next){
			if (req.user.type != "admin") {
				var error = new Error('no eres admin ');
				return error;
			}
			Movie.findById(req.movie._id, function(err,movie){
				if(!movie)
					return next(new Error('Could not load Document'));
				else{
					movie.remove(function (err) {
						if (err!=null) {return next(err)}
						else
							// if no error, your model is removed
							res.status(200).send();
					});
				}

			});
		},
		getAllMovies: function(req, res, next){
			var populateQuery = [{path:'books', select:'title pages'}, {path:'movie', select:'director'}];
			Movie.find()
				 .populate('relatedMovies comments')				 				 
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
			Movie.findById(id)
				 .populate('relatedMovies comments')				 				 
				 .exec(function(err,movie){
					if (err) {return next(err);}
					if (!movie) {return next(new Error("Can't find movie"));}

					req.movie = movie;
					return next();
				 });
		},
		getLinkedObjectsOfMovie: function(req, res, next) {
		  //aca cargar los comentarios
		  res.json(req.movie);
		},
		addRelatedMovie: function(req, res, next){
			if (req.user.type != "admin") {
 				var error = new Error('no eres admin ');
 				return next(error);
 			}			

			Movie.findById(req.movie._id)
				 .populate('relatedMovies')
				 .exec(function(err,movie){
					 if (err) {return next(err);}
					 var existe = false;
					 movie.relatedMovies.forEach(function(relMovie){
						if (relMovie._id == req.body._id) existe=true;
					});

					 if (!existe){
						 movie.relatedMovies.push(req.body);
						 movie.save(function(err, post) {
							if(err){ return next(err); }

						res.json(movie);
						});
					 } else{
						 return next();
					}
				 });
		},
		deleteRelatedMovie: function(req, res, next){
			if (req.user.type != "admin") {
 				var error = new Error('no eres admin ');
 				return next(error);
 			}			

			var idPeliculaModificar = req.params.movie;
			var relatedMovieId = req.params.relatedMovie;

			Movie.findById(idPeliculaModificar)
				 .populate('relatedMovies')
				 .exec(function(err,movie){
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
						 movie.relatedMovies.pull(aSacar);
						 movie.save(function(err, post) {
							if(err){ return next(err); }

							res.json(movie);
						});
					 } else {
						 return next();
					 }
				 });

		},
		addComment: function(req,res,next){			
			
			Movie.findById(req.movie._id)
				 .populate('comments')
				 .exec(function(err,movie){
					 
					 if (err) {return next(err);}
					 var existe = false;
					 var aSacar;
					 movie.comments.forEach(function(comment){						 
						if (comment.idAuthor == req.body.idAuthor){
							//el autor ya califico
							existe=true;
							aSacar = comment;
						} 
					 });

					 if (!existe){
						 //creo el nuevo comentario y lo agrego						
						var nuevo = new Comment({body: req.body.comment, author: req.body.authorName, idAuthor: req.body.idAuthor, rating: req.body.rate});
						nuevo.save(function (err) {
						if (err) {                                
							console.log("error al crear", err);
						} else {
							
								movie.comments.push(nuevo);
						 
								movie.save(function(err, movie) {
									if(err){ 
										return next(err); 
							
									}
							
									res.json(movie);
								});
						}
						});

						 
					}
					 else{
						 //la calificacion existe y lo reemplazo
						 
						 nuevo = new Comment({body: req.body.comment, author: req.body.authorName, idAuthor: req.body.idAuthor, rating: req.body.rate});
						 nuevo.save(function (err) {
						if (err) {                                
							console.log("error al reemplazar");
						} else {

								movie.comments.pull(aSacar);
								movie.comments.push(nuevo);
						 
								movie.save(function(err, movie) {
									if(err){ 

										return next(err); 
									}

									res.json(movie);
								});
						}
						});
					}

				 });
			
			
			
		},
		deleteComment: function(req,res,next){			
			
			Movie.findById(req.movie._id)
				 .populate('comments')
				 .exec(function(err,movie){
			
					 if (err) {return next(err);}
					 var existe = false;
					 var aSacar;
					 movie.comments.forEach(function(comment){						 
						if (comment.idAuthor == req.params.comment){
			
							//el autor ya califico
							existe=true;
							aSacar = comment;
						} 
					 });

					if (!existe){
						//si no existe error
			
						return next(new Error('Could not delete comment'));
						 
					}
					 else{
						 //la calificacion existe y la elimino
						 						 
						movie.comments.pull(aSacar);		
						movie.save(function(err, movie) {
							if(err){ 
			
								return next(err); 
							}
			
							res.json(movie);
						});
					}
				});
		},		
		getComments: function(req,res,next){
			Movie.findById(req.movie._id)
				 .populate('comments')
				 .exec(function(err,movie){					 
					 if (err) {return next(err);}
					 else return movie;
				 });
		}
	}
})();
