myApp.factory('postFactory', function($http, $window, $location){
  var o = {
    posts: []
  };

  o.createMovie = function(input, callback){
			console.log('en postFactory', input);
			$http.post('/movies', input).success(function(data){
				console.log(data);
				o.posts.push(data);
				//la uso como promesa
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
  

	o.deleteMovie = function(input, callback){
		console.log('en postfactory delete', input._id);
		var idEliminar = input._id;
		
		//¡¡PREGUNTAR!!
		$http.delete('/movies/'+input._id)
			.then(onSuccess,onError);
			
		function onSuccess(data){}
		
		function onError(data){
			if(data.status==404) {
				//elimino el elemento			
				console.log("la longitud es", o.posts.length)
				for(var i = 0; i < o.posts.length; i++) {
					console.log("elemento ",i," es ",o.posts[i]._id);
					if (o.posts[i]._id == idEliminar){
						//lo borro
						delete o.posts[i];
						console.log("borre elemento ",i," es ",o.posts[i]);
					}				
				}
										
				callback(data);		
			}
		}
	}

	o.addRelatedMovie = function(input, id, callback){
		console.log("en postfactory relatedMovie ", input, id);
		//input es la relatedMovie, id es el id de la pelicula "que la contiene"
		return $http.post('/movies/'+id+'/relatedMovies/', input)
			.success(function(res){
				//agrego la nueva pelicula relacionada
				for(var i = 0; i < o.posts.length; i++) {
					
					if (o.posts[i]._id == id){
						//agrego la pelicula  || hay que hacer el parse porque en el controlador se hace stringify
						o.posts[i]['relatedMovies'].push(JSON.parse(input));												
						var retornar = o.posts[i];
					}				
				}
				callback (retornar);
			});
	}

	o.deleteRelatedMovie = function(input, id, callback){
		console.log("peli modif ", id," peli elim ",input._id);
		return $http.delete('/movies/'+id+'/relatedMovies/'+input._id)
			.success(function(data){
				//recorro las peliculas
				var retornar;
				for(var i = 0; i < o.posts.length; i++) {
					
					if (o.posts[i]._id == id){
						//elimino la pelicula relacionada
						console.log("el par id-id es", o.posts[i]._id == id);
						var listaDeRelacionadas = o.posts[i]['relatedMovies'];
						var nuevaListaRelacionadas = [];
						for(var j = 0; j < listaDeRelacionadas.length; j++) {
							if (listaDeRelacionadas[j]._id == input._id){	
								//SI LA PELICULA ES LA QUE QUIERO ELIMINAR NO LA AGREGO A LA NUEVA LISTA								
							}
							else{
								nuevaListaRelacionadas.push(listaDeRelacionadas[j]);
							}
						}
						o.posts[i]['relatedMovies'] = nuevaListaRelacionadas;
						retornar = o.posts[i];
					}
				}
				//RETORNO LA PELICULA MODIFICADA
				callback(retornar);
				
			});
	}

  return o;
})
