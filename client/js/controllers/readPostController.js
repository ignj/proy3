myApp.controller('readPostController', function(post, $scope, postFactory, userFactory){
	    
	$scope.post = post;
	$scope.newRate = {rate:"3"}; //lo creo con 3 estrellas
	$scope.user;
	$scope.loginChecked = false;
	
	// Para obtener el usuario logueado
	userFactory.getUserLogin(function(user){
		$scope.user = user;		
		
		$scope.loginChecked = true;		
	});
	
	// calificar una pelicula
	$scope.rateMovie = function(input){		
		
		//agrego id y nombre del usuario que comenta
		$scope.newRate.idAuthor = $scope.user.username;
		$scope.newRate.authorName = $scope.user.name;		
		
		postFactory.addCommentToMovie(input, angular.copy($scope.newRate), function(response){
		
			$scope.post = response;			
		})
	}
	
	//eliminar comentario
	$scope.deleteComment = function(input){
		
		
		postFactory.deleteCommentFromMovie(angular.copy($scope.post), input, function(response){
		
			$scope.post = response;
		})
	}
	
});
