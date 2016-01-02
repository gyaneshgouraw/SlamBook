angular.module('LoginModuleCtrl')
	.controller('SlambookExt',['$scope','$route', function($scope,$route) {

	console.log("SlambookExt controller");
	 if ($route)
	        console.log("refrencecode", $route)

}]);