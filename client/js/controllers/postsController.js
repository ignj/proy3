myApp.controller('postsController',
function($scope, $stateParams, $location , $http, postFactory){
	
    $scope.posts = postFactory.posts;	
    $scope.post = postFactory.posts[$stateParams.id];	
	
	//agregar peliculas
	/*$scope.addPost = function(){	
		//si la pelicula no tiene titulo no la cargo
		if(!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({title: $scope.title,
						   year: $scope.title,
						   runtime: $scope.runtime,
						   genre: $scope.genre,
						   director: $scope.director,
						   actors: $scope.actors,
						   plot: $scope.plot,
						   poster: $scope.poster,
						   relatedMovies: 'esto es un arreglo de objetos pelicula',
						   comments: [
								{author: 'Joe', body: 'Cool post!'},
								{author: 'Bob', body: 'Great idea but everything is wrong!'}
							  ]
						   });
		//reseteo los campos
		$scope.title = '';
		$scope.year = '';
		$scope.runtime = '';
		$scope.genre = '';
		$scope.director = '';
		$scope.actors = '';
		$scope.plot = '';
		$scope.poster = '';		
	}*/
	$scope.addPost = function(input){
		console.log('entrada addpost', input);
		postFactory.createMovie(input, function(response){
			console.log(response);
		})		
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