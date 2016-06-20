myApp.controller('mainController', function($scope, $rootScope, $location, $http, userFactory, postFactory){
  $scope.registeredUser = {};
  $scope.error = {};
  $scope.loginChecked = true;
  $scope.user = false;
  $scope.isAdmin = false;

  userFactory.getUserLogin(function(user){
    $scope.user = user;
    $scope.loginChecked = false;
    if ($scope.user.type == "admin")
      $scope.isAdmin = true;
  });


  userFactory.checkLogin(function(response){

    if(response.data){
      $location.url('/dashboard');
    }
  });

  $scope.createUser = function(input){
    //call factory
    userFactory.createUser(input, function(response){

    })
    $scope.newUser = {};

  }

  $scope.loginUser = function(input){

    //call factory
    userFactory.loginUser(input, function(response){

      if(response.err){

        $scope.error.message = response.err;
      } else {

        $location.url('/dashboard');
      }
    })
    $scope.userData = {};
  }

  $scope.logoutUser = function(){
    //call factory
    
    userFactory.logoutUser(function(response){      
      window.location.reload();      
      $scope.loginChecked = true;
    });
  }

  //obtengo las peliculas
  $scope.posts = postFactory.posts;
  $scope.precargarCamposError = ""; //ningun error

  //**ordenamiento de peliculas**
  $scope.propertyName = '_id';
  $scope.reverse = true;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
  //** fin ordenamiento peliculas**
  
  //para agregar pelicula
  $scope.addPost = function(input){	  
	  if(!$scope.newPost || typeof $scope.newPost.title == 'undefined' || $scope.newPost.title === ""){
			//no dejo que grabe una pelicula con titulo vacio
			$scope.precargarCamposError = "Title cannot be empty!"
	  }
	  else{
		postFactory.createMovie(input, function(response){
	
			//restauro los campos
			$scope.newPost.title = "";
			$scope.newPost.year = "";
			$scope.newPost.runtime = "";
			$scope.newPost.genre = "";
			$scope.newPost.director = "";
			$scope.newPost.actors = "";
			$scope.newPost.plot = "";
			$scope.newPost.poster = "";
			$scope.precargarCamposError = "";
		});
	  }
	}

	//para cargar pelicula del servicio
	$scope.precargarCampos = function(input){
		//defino la consulta
		title = input;
		query = 'http://www.omdbapi.com/?t='+title+'&y=&plot=short&r=json';
		//llamo al servicio
		$http.get(query).success( function(data, status){
			//obtengo los resultados en variables

			if (typeof data.Error != 'undefined'){
				//hubo un error (no de red)
				$scope.precargarCamposError = data.Error;
			} else {
				//limpio un posible error
				$scope.precargarCamposError ="";
			}

			var title = data.Title,
				year = data.Year,
				runtime = data.Runtime,
				genre = data.Genre,
				director = data.Director,
				actors = data.Actors,
				plot = data.Plot,
				poster = data.Poster;

			//los incorporo a la vista
			$scope.newPost.title = title;
			$scope.newPost.year = year;
			$scope.newPost.runtime = runtime;
			$scope.newPost.genre = genre;
			$scope.newPost.director = director;
			$scope.newPost.actors = actors;
			$scope.newPost.plot = plot;
			$scope.newPost.poster = poster;
			}
		)
		.error(function (data, status) {
            $scope.precargarCamposError = 'Request failed';
    });
	}

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  // Initialize collapse button
 $(".button-collapse").sideNav();
 // Initialize collapsible (uncomment the line below if you use the dropdown variation)
 

});
