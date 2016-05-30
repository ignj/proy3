myApp.factory('postFactory', function($http, $window){
  var o = {
    posts: []
  };

  o.createMovie = function(input, callback){
			console.log('en postFactory', input);
			$http.post('/movies', input).success(function(data){
				console.log(data);
				o.posts.push(data);
		  });
  };
  
  o.getAllMovies = function(){
		return $http.get('/movies')
            .success(function (data) {
            angular.copy(data, o.posts);
        });
  };
 
  return o;    
})
