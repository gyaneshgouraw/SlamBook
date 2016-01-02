angular.module('appRoutes', []).config(['$routeProvider','$stateProvider', '$locationProvider',function($routeProvider,$stateProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
		    templateUrl: 'views/login.html',
		    controller: 'LoginController'
		})
		.when('/login/:code1/:code2', {
		    templateUrl: 'views/slambookExt.html',
		    controller: 'SlambookExt'
		})
		
		.when('/dashboard', {
		    templateUrl: 'views/nerd.html',
		    controller: 'DashboardController'
		})

		.when('/aboutme', {
		    templateUrl: 'views/home.html',
		    controller: 'MainController'
		})
     .otherwise({
         redirectTo: '/'
     });

	$locationProvider.html5Mode(true);

}]);

