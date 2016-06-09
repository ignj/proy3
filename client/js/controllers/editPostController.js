myApp.controller('editPostController',
function(actualPost, postFactory, $scope, $http, $location, $log, $window, userFactory){

	$scope.isAdmin = false;
  userFactory.getUserLogin(function(user){
    $scope.user = user;
    $scope.loginChecked = true;
    console.log("en vista el user es:");
    console.log($scope.user.type);
    if ($scope.user.type == "admin")
      $scope.isAdmin = true;
  });


	$scope.actualPost = actualPost;
	$scope.posts = postFactory.posts;
	console.log("los posts son", $scope.posts);
	$scope.precargarCamposError = ""; //ningun error

	//para editar pelicula
	$scope.editPost = function(input){
		console.log('entrada editpost', input);
		postFactory.editMovie(input, function(response){
			console.log(response);
		})
	}

	//para eliminar la pelicula
	$scope.eliminarPelicula = function(input){
		console.log('entrada eliminar ', input);
		postFactory.deleteMovie(input, function(){
			console.log("SE ELIMINO-------------");
			$scope.posts = postFactory.posts;
			$location.path('/home');
			$location.replace();					
		})
	}

	$scope.votar = function(input){
		console.log("en votar", input);
		postFactory.setRating(input, function(response){
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

	//eliminacion de pelicula relacionada
	$scope.eliminarPeliculaRelacionada = function(input){
		id = actualPost._id;
		console.log("peli modif ", id," peli elim ",input._id);
		postFactory.deleteRelatedMovie(input, id, function(data){			
			$scope.posts = postFactory.posts;
			$scope.actualPost = data;
		});
		
	}

	//AUTOCOMPLETADO
	// list of movies to be displayed
	$scope.movies = $scope.posts;
	$scope.querySearch   = querySearch;
	$scope.selectedItemChange = selectedItemChange;
	$scope.searchTextChange   = searchTextChange;
	$scope.searchText = "";

	function querySearch (query) {
		var results = query ? $scope.movies.filter( createFilterFor(query) ) : $scope.movies, deferred;

        return results;

	}
	function searchTextChange(text) {
		$log.info('Text changed to ' + text);
	}

	//se añade la pelicula relacionada
	function selectedItemChange(item) {
		$log.info('Item changed to ' + JSON.stringify(item));
		input = JSON.stringify(item);
		if (item != null){
			id = actualPost._id;
			postFactory.addRelatedMovie(input, id, function(data){
				console.log("se agrego la relacionada", data);
				$scope.posts = postFactory.posts;
				console.log("data es ",data);
				$scope.actualPost = data;
			});
		}		
	}
	
	//filter function for search query
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(movie) {
			var titulo = movie.title.toLowerCase();
			return (titulo.indexOf(lowercaseQuery) === 0);
		};
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
