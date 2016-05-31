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
	.state('posts', {
		url: '/posts/:id',
		templateUrl: '/partials/readEditPost.html',	  						
		resolve: {
            post: ['$stateParams', 'postFactory', function ($stateParams, postFactory) {
                return postFactory.get($stateParams.id);
			}]
		},
		controller: 'readEditPostController'
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