myApp.controller('dashboardController', function($scope, $location, userFactory){
  $scope.user = {};
  userFactory.getUser(function(data){
    console.log(data);
    $scope.user = data;
  })
  if(!$scope.user.username){
    $location.url('/');
  }
  userFactory.getAllUsers(function(data){
    console.log(data, 'all user data');
    $scope.persons = data;
  })

  $scope.addFriend = function(friend, user){
    userFactory.addFriend(friend, user, function(response){
    })
  }

  $scope.logout = function(){
    userFactory.logoutUser();
    $location.url('/');
  }
});
