myApp.controller('mainController', function($scope, $location, $http, userFactory){
  $scope.registeredUser = {};
  $scope.error = {};
  userFactory.checkLogin(function(response){
    console.log(response);
    if(response.data){
      $location.url('/dashboard');
    }
  });
  $scope.createUser = function(input){
    console.log('make this new user', input);
    //call factory
    userFactory.createUser(input, function(response){
      console.log(response);
    })
    $scope.newUser = {};

  }

  $scope.loginUser = function(input){
    console.log('trying to login user with', input);
    //call factory
    userFactory.loginUser(input, function(response){
      console.log(response);
      if(response.err){
        console.log('there was an error!');
        $scope.error.message = response.err;
      } else {
        console.log('no error, log them in');
        $location.url('/dashboard');
      }
    })
    $scope.userData = {};
  }
});
