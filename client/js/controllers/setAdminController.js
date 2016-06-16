myApp.controller('setAdminController', function($scope, $location, userFactory){
	
	$scope.user;
	$scope.loginChecked = false;
	$scope.code = {};
	
	// Para obtener el usuario logueado
	userFactory.getUserLogin(function(user){
		$scope.user = user;		
		console.log(user);
		$scope.loginChecked = true;		
	});
	
	$scope.setAdmin = function(input){
		console.log("codigo es ",input," usuario es ", $scope.user);
		userFactory.setAdmin(input, angular.copy($scope.user), function(response){
			console.log("volvi a controlador ",response);
			$scope.user = response;
			$location.path('/home');
			$location.replace();
		})
	}
	
});