myApp.controller('readPostController', function(post, $scope, postFactory){
	    
	$scope.post = post;
	$scope.newRate = {};
	
	$scope.rateMovie = function(input){
		console.log("grabar ",$scope.newRate.rate," ",$scope.newRate.comment," en ",post);
		//agrego id y nombre de usuario truchos
		$scope.newRate.idAuthor = 999;
		$scope.newRate.authorName = "camelCaseGuy";
		
		postFactory.addCommentToMovie(input, angular.copy($scope.newRate), function(response){
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
