myApp.controller('editPostController',
function(actualPost, postFactory, $scope, $http){
	    
	$scope.actualPost = actualPost;		
	$scope.precargarCamposError = ""; //ningun error
	
	//para editar pelicula
	$scope.editPost = function(input){
		console.log('entrada editpost', input);
		postFactory.editMovie(input, function(response){
			console.log(response);
		})		
	}
	
	//para cargar pelicula del servicio
	$scope.precargarCampos = function(input){		
		//defino la consulta
		title = input;
		query = 'http://www.omdbapi.com/?t='+title+'&y=&plot=short&r=json';
		//llamo al servicio
		$http.get(query).success( function(data, status){
			//obtengo los resultados en variables			
						
			if (typeof data.Error != 'undefined'){
				//hubo un error (no de red)
				$scope.precargarCamposError = data.Error;
			}
			
			var title = data.Title,
				year = data.Year,
				runtime = data.Runtime,
				genre = data.Genre,
				director = data.Director,
				actors = data.Actors,
				plot = data.Plot,
				poster = data.Poster;
				
			//los incorporo a la vista
			
			$scope.actualPost.title = title;
			$scope.actualPost.year = year;
			$scope.actualPost.runtime = runtime;
			$scope.actualPost.genre = genre;
			$scope.actualPost.director = director;
			$scope.actualPost.actors = actors;
			$scope.actualPost.plot = plot;
			$scope.actualPost.poster = poster;
			
			}
		)
		.error(function (data, status) {			
            $scope.precargarCamposError = 'Request failed';
        });
	}
	
});

/* formato de pelicula en base de datos
  title: String,
  year: String,
  runtime: String,
  genre: String,
  director: String,
  actors: String,
  plot: String,
  poster: String,
  //keywords: [String],
  relatedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]*/