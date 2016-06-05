var myApp = angular.module('myApp', ['ui.router']);

myApp.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/partials/main.html',
      resolve: {
                postPromise: ['postFactory', function (postFactory) {
                    return postFactory.getAllMovies();
				}]
			}	  
	})    
	.state('logueado', {
		url: '/dashboard',
		templateUrl: '/partials/dashboard.html'
	})
	.state('postEdition', {
		url: '/posts/e/:id',
		templateUrl: '/partials/editPost.html',	  						
		resolve: {
            actualPost: ['$stateParams', 'postFactory', function ($stateParams, postFactory) {
                return postFactory.get($stateParams.id);
			}]
		},
		controller: 'editPostController'
	})

  $urlRouterProvider.otherwise('home');
}]);
	
	
	//esto de abajo es con el ruteo de ngRouting. lo cambie por
	//el framework ui.router porque es mas "novedoso y completo"	
  /*.config(function($routeProvider, $httpProvider){
    $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html'
    })
    .otherwise({
      redirectTo:'/'
    });
  })
*/