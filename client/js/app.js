var myApp = angular.module('myApp', ['ui.router', 'ngMaterial', 'angular-input-stars']);

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
	.state('postEdition', {
		url: '/posts/e/:id',
		templateUrl: '/partials/editPost.html',
		resolve: {
            actualPost: ['$stateParams', 'postFactory', function ($stateParams, postFactory) {
                return postFactory.get($stateParams.id);
			}],
			postPromise: ['postFactory', function (postFactory) {
                    return postFactory.getAllMovies();
			}]
		},
		controller: 'editPostController'
	})
	.state('posts', {
		url: '/posts/:id',
		templateUrl: '/partials/readPost.html',
		resolve: {
            post: ['$stateParams', 'postFactory', function ($stateParams, postFactory) {
                return postFactory.get($stateParams.id);
			}]
		},
		controller: 'readPostController'
	})

  $urlRouterProvider.otherwise('home');
}]);
