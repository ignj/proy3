myApp.factory('postFactory', function($http, $window, $location){
  var o = {
    posts: []
  };

  o.createMovie = function(input, callback){
			$http.post('/movies', input).success(function(data){
				o.posts.push(data);				
				callback(data);
			});
  };

  o.getAllMovies = function(){
		return $http.get('/movies')
        .success(function (data) {
          angular.copy(data, o.posts);
    });
  };

  o.get = function (id) {
          return $http.get('/movies/' + id)
            .then(function (res) {		          
              return res.data;
          });
	};

	o.editMovie = function(input, callback){		
		return $http.put('/movies/', input)
			.success(function(data){				
				callback(data);
			});
	};

	o.deleteMovie = function(input, callback){		
		var idEliminar = input._id;
		
		$http.delete('/movies/'+input._id)
			.then(onSuccess,onError);

		function onSuccess(data){			
				callback(data);
		}

		function onError(data){
			if(data.status==404) {
				console.log("Recurso no encontrado");
			}
		}
	}

	o.addRelatedMovie = function(input, id, callback){		
		return $http.post('/movies/'+id+'/relatedMovies/', input)
			.success(function(res){
				callback(res);
			});
	}

	o.deleteRelatedMovie = function(input, id, callback){
		return $http.delete('/movies/'+id+'/relatedMovies/'+input._id)
			.success(function(data){				
				callback(data);

			});
	}
	
	//MANEJO DE COMENTARIOS
	
	o.addCommentToMovie = function(input, commentData, callback){		
		return $http.post('/movies/'+input._id+'/comments/',commentData)
			.success(function(data){			
				callback (data);
			});
	}
	
	o.deleteCommentFromMovie = function(movie, commentData, callback){		
		return $http.delete('/movies/'+movie._id+'/comments/'+commentData.idAuthor)
			.success(function(data){					
				
				callback (data);
			});
	}

  return o;
})
