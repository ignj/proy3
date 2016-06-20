myApp.controller('setAdminController', function($scope, $location, userFactory){
	
	$scope.user;
	$scope.loginChecked = false;
	$scope.code = {};
	
	// Para obtener el usuario logueado
	userFactory.getUserLogin(function(user){
		$scope.user = user;		
		
		$scope.loginChecked = true;		
	});
	
	$scope.setAdmin = function(input){
		
		userFactory.setAdmin(input, angular.copy($scope.user), function(response){
		
			$scope.user = response;
			$location.path('/home');
			$location.replace();
		})
	}
	
});