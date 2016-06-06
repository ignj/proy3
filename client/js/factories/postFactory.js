myApp.factory('postFactory', function($http, $window, $location){
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

	o.editMovie = function(input, callback){
		console.log('en postFactory edit', input);
		return $http.put('/movies/', input)
			.success(function(data){
				console.log(data);
			});
	};

  o.setRating = function(input, callback){
    console.log("en la factory", input);
    return $http.put('/setrating/', input)
			.success(function(data){
				console.log(data);
			});
  }

	o.deleteMovie = function(input){
		console.log('en postfactory delete', input._id);
		$http.delete('/movies/' + input._id)
		$location.path('/home');
		$location.replace();
		$window.location.reload();
	}

	o.addRelatedMovie = function(input, id, callback){
		console.log("en postfactory relatedMovie ", input, id);
		//input es la relatedMovie, id es el id de la pelicula "que la contiene"
		return $http.post('/movies/'+id+'/relatedMovies/', input)
			.then(function(res){
				return res.data;
			});
	}

	o.deleteRelatedMovie = function(input, id, callback){
		console.log("peli modif ", id," peli elim ",input._id);
		return $http.delete('/movies/'+id+'/relatedMovies/'+input._id)
			.success(function(data){
				return data;
			});
	}

  return o;
})
