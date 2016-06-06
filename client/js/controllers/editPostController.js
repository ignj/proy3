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
		postFactory.deleteMovie(input, function(response){
			console.log("se elimino");
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
		postFactory.deleteRelatedMovie(input, id);
		$window.location.reload();
	}

	//autocompletado

	//var self = this;
	// list of movies to be displayed
	//$scope.movies        = loadStates();
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
		id = actualPost._id;
		postFactory.addRelatedMovie(input, id);

		//actualizo la pagina
		$window.location.reload();
	}
	//build list of states as map of key-value pairs
	/*function loadStates() {
		var allMovies = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
		 Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
		 Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
		 Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
		 North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
		 South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
		 Wisconsin, Wyoming';
		return allMovies.split(/, +/g).map( function (movie) {
			return {
				value: movie.toLowerCase(),
				display: movie
			};
		});
	}*/
	//filter function for search query
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(movie) {
			var titulo = movie.title.toLowerCase();
			return (titulo.indexOf(lowercaseQuery) === 0);
		};
	}

	   //console.log(self.states);

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
