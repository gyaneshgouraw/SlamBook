/*=======================================================================================================================================
=     Providers are objects that provide (create) instances of services and expose configuration APIs 
	  that can be used to control the creation and runtime behavior of a service. 
	  In case of the $route service, the $routeProvider exposes APIs that allow you to define routes for your application.       =
=======================================================================================================================================*/
angular.module('appRoutes', []).config(['$routeProvider','$stateProvider', '$locationProvider',function($routeProvider,$stateProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
		    templateUrl: 'views/login.html',
		    controller: 'LoginController'
		})
		.when('/login/:senderid/:recieverid', {
		    templateUrl: 'views/slambookExt.html',
		    controller: 'SlambookExt'
		})
			.when('/login/:senderid/:recieverid/:sendermailid/:recievermailid', {
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

/*=====  End of Section comment block  ======*/

/**
 1)https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection
	TODO:
	- \ factory, service, and value are all just shortcuts to define various parts of a provider--
	    that is, they provide a means of defining a provider without having to type all that stuff out. 
	- Second todo item

 */

