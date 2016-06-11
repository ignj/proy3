myApp.controller('readPostController', function(post, $scope, postFactory, userFactory){
	    
	$scope.post = post;
	$scope.newRate = {rate:"3"}; //lo creo con 3 estrellas
	$scope.user;
	$scope.loginChecked = false;
	
	// Para obtener el usuario logueado
	userFactory.getUserLogin(function(user){
		$scope.user = user;		
		console.log(user);
		$scope.loginChecked = true;		
	});
	
	// calificar una pelicula
	$scope.rateMovie = function(input){		
		console.log("id ",$scope.user.username," usuario ",$scope.user.name);
		//agrego id y nombre del usuario que comenta
		$scope.newRate.idAuthor = $scope.user.username;
		$scope.newRate.authorName = $scope.user.name;		
		
		postFactory.addCommentToMovie(input, angular.copy($scope.newRate), function(response){
			console.log("response ",response);
			$scope.post = response;			
		})
	}
	
	//eliminar comentario
	$scope.deleteComment = function(input){
		console.log("eliminar comentario ",input);
		
		postFactory.deleteCommentFromMovie(angular.copy($scope.post), input, function(response){
			console.log("response ",response);
			$scope.post = response;
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
