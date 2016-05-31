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
  
  o.get = function (id) {
			console.log('en postFactory ', id);
          return $http.get('/movies/' + id)
            .then(function (res) {
				console.log("en postfactory, valor de retorno ", res.data);
              return res.data;
          });
	};
 
  return o;    
})
